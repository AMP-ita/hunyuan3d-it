(() => {
  if (window.__hyIT) return;
  window.__hyIT = true;

  const DICTS = { it: window.HY_DICT || {}, en: window.HY_DICT_EN || {} };
  const LANGS = ["en", "it", "zh"];   // ordine di Alt+Shift+L; zh = testo originale
  const LANG_NAMES = { en: "English", it: "Italiano", zh: "Original (Chinese)" };
  const LS_KEY = "hy-lang";
  const HAS_HAN = /[㐀-鿿]/;
  const ATTRS = ["placeholder", "title", "aria-label", "alt"];

  let lang = "en";
  let prevLang = "en";               // lingua a cui torna Alt+Shift+O
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (LANGS.includes(saved)) lang = saved;
  } catch {}
  if (lang === "zh") prevLang = "en";

  let DICT, PARTIAL, NUMERIC;
  function useDict() {
    DICT = DICTS[lang] || {};
    // Chiavi con "%d": il numero cambia (countdown, coda), quindi si confrontano come pattern
    const keys = Object.keys(DICT);
    NUMERIC = keys.filter(k => k.includes("%d")).map(k => ({
      re: new RegExp("^" + k.split("%d").map(s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("(\\d+)") + "$"),
      tpl: DICT[k],
    }));
    // Chiavi per sostituzione parziale: più lunghe prima, niente chiavi di 1 carattere
    PARTIAL = keys.filter(k => [...k].length > 1 && !k.includes("%d")).sort((a, b) => b.length - a.length);
  }
  useDict();

  const originals = new WeakMap();   // textNode -> testo originale
  const written = new WeakMap();     // textNode -> ultimo testo scritto da noi
  const missing = new Set();
  const mtCache = new Map();         // "lingua|testo" -> traduzione automatica

  // --- Traduttore integrato di Chrome (on-device, Chrome 138+) come fallback ---
  // Se il modello di traduzione va ancora scaricato, Chrome richiede un gesto
  // dell'utente: lo creiamo al primo clic/tasto sulla pagina e intanto le
  // traduzioni in attesa restano in coda. Un traduttore per lingua di destinazione.
  const translators = new Map();
  function getTranslator(l) {
    if (l === "zh") return Promise.resolve(null);
    if (translators.has(l)) return translators.get(l);
    const opts = { sourceLanguage: "zh", targetLanguage: l };
    const p = new Promise(resolve => {
      (async () => {
        try {
          if (!("Translator" in self)) return resolve(null);
          const av = await Translator.availability(opts);
          if (av === "unavailable") return resolve(null);
          if (av === "available") return resolve(await Translator.create(opts));
          const onGesture = () => {
            ["pointerdown", "keydown"].forEach(t => removeEventListener(t, onGesture, true));
            toast("Downloading translation model…");
            Translator.create(opts).then(t => { resolve(t); toast("Translation model ready"); },
                                         () => resolve(null));
          };
          ["pointerdown", "keydown"].forEach(t => addEventListener(t, onGesture, true));
        } catch { resolve(null); }
      })();
    });
    translators.set(l, p);
    return p;
  }

  function translateSync(text) {
    const t = text.trim();
    if (!t || !HAS_HAN.test(t)) return null;
    if (DICT[t] != null) return text.replace(t, DICT[t]);
    for (const { re, tpl } of NUMERIC) {
      const m = t.match(re);
      if (m) { let i = 0; return text.replace(t, tpl.replace(/%d/g, () => m[++i])); }
    }
    let out = t;
    for (const k of PARTIAL) if (out.includes(k)) out = out.split(k).join(DICT[k]);
    if (!HAS_HAN.test(out)) return text.replace(t, out);
    return null; // non coperto dal dizionario
  }

  async function translateMT(t, l) {
    const key = l + "|" + t;
    if (mtCache.has(key)) return mtCache.get(key);
    const tr = await getTranslator(l);
    if (!tr) return null;
    try {
      const r = await tr.translate(t);
      mtCache.set(key, r);
      return r;
    } catch { return null; }
  }

  function setNode(node, value) {
    written.set(node, value);
    node.nodeValue = value;
  }

  function handleText(node) {
    const cur = node.nodeValue;
    if (written.get(node) === cur) return;          // già nostro
    if (!cur || !HAS_HAN.test(cur)) return;
    const p = node.parentElement;
    if (!p || /^(SCRIPT|STYLE|TEXTAREA|CODE)$/.test(p.tagName) || p.isContentEditable) return;

    originals.set(node, cur);
    if (lang === "zh") return;
    // Tooltip nativo con il cinese originale (utile per cercare termini)
    if (!p.hasAttribute("title") && cur.trim().length < 80) {
      p.__hyOwnTitle = cur.trim();
      p.setAttribute("title", cur.trim());
    }

    const tr = translateSync(cur);
    if (tr != null) { setNode(node, tr); return; }

    const t = cur.trim();
    const l = lang;
    missing.add(t);
    translateMT(t, l).then(r => {
      if (r && node.nodeValue === cur && lang === l) setNode(node, cur.replace(t, r));
    });
  }

  function handleAttrs(el) {
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (!v || !HAS_HAN.test(v)) continue;
      if (a === "title" && el.__hyOwnTitle === v) continue;
      if (el.__hyAttr && el.__hyAttr[a] === v) continue;
      el.__hyOrigAttr = el.__hyOrigAttr || {};
      el.__hyOrigAttr[a] = v;
      if (lang === "zh") continue;
      const apply = s => { el.__hyAttr = el.__hyAttr || {}; el.__hyAttr[a] = s; el.setAttribute(a, s); };
      const tr = translateSync(v);
      if (tr != null) { apply(tr); continue; }
      const l = lang;
      missing.add(v);
      translateMT(v.trim(), l).then(r => { if (r && el.getAttribute(a) === v && lang === l) apply(r); });
    }
  }

  function walk(root) {
    if (root.nodeType === 3) return handleText(root);
    if (root.nodeType !== 1 && root.nodeType !== 11) return;
    if (root.nodeType === 1) handleAttrs(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) handleText(n);
      else {
        handleAttrs(n);
        if (n.shadowRoot) { walk(n.shadowRoot); observe(n.shadowRoot); }
      }
    }
  }

  const mo = new MutationObserver(muts => {
    for (const m of muts) {
      if (m.type === "characterData") handleText(m.target);
      else if (m.type === "attributes") handleAttrs(m.target);
      else m.addedNodes.forEach(walk);
    }
  });
  function observe(root) {
    mo.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  // Ripristina il cinese originale e dimentica le nostre scritture, così un
  // successivo walk() riparte da zero (anche con un'altra lingua).
  function restoreAll() {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) {
        const o = originals.get(n);
        if (o != null) { written.delete(n); n.nodeValue = o; }
      } else if (n.__hyOrigAttr) {
        for (const [a, v] of Object.entries(n.__hyOrigAttr)) {
          if (n.__hyAttr) delete n.__hyAttr[a];
          n.setAttribute(a, v);
        }
      }
    }
  }

  function setLang(l) {
    if (l === lang) return;
    if (lang !== "zh") prevLang = lang;
    lang = l;
    try { localStorage.setItem(LS_KEY, lang); } catch {}
    useDict();
    missing.clear();
    restoreAll();
    if (lang !== "zh") walk(document.body);
    document.documentElement.lang = lang;
    toast("Language: " + LANG_NAMES[lang]);
  }

  // Scorciatoie:
  //  Alt+Shift+L  -> cambia lingua (English -> Italiano -> originale cinese)
  //  Alt+Shift+O  -> alterna testo originale cinese / ultima lingua usata
  //  Alt+Shift+M  -> copia negli appunti le stringhe non presenti nel dizionario
  document.addEventListener("keydown", e => {
    if (!e.altKey || !e.shiftKey) return;
    if (e.code === "KeyL") {
      setLang(LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length]);
    } else if (e.code === "KeyO") {
      setLang(lang === "zh" ? prevLang : "zh");
    } else if (e.code === "KeyM") {
      const obj = {};
      missing.forEach(s => { obj[s] = mtCache.get(lang + "|" + s.trim()) || ""; });
      navigator.clipboard.writeText(JSON.stringify(obj, null, 2)).then(
        () => toast(`${missing.size} missing strings copied`),
        () => { console.log("[Hunyuan 3D Translator] missing:", obj); toast("See console"); }
      );
    }
  }, true);

  function toast(msg) {
    const d = document.createElement("div");
    d.className = "hy-it-toast";
    d.textContent = msg;
    written.set(d.firstChild, msg);
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 1800);
  }

  if (lang !== "zh") walk(document.body);
  observe(document.body);
  document.documentElement.lang = lang;
})();
