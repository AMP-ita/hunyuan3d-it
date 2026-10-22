(() => {
  if (window.__hyIT) return;
  window.__hyIT = true;

  const DICT = window.HY_DICT || {};
  const CJK = /[㐀-鿿！-～　-〿]/;
  const HAS_HAN = /[㐀-鿿]/;
  const ATTRS = ["placeholder", "title", "aria-label", "alt"];

  // Chiavi per sostituzione parziale: più lunghe prima, niente chiavi di 1 carattere
  const PARTIAL = Object.keys(DICT).filter(k => [...k].length > 1).sort((a, b) => b.length - a.length);

  const originals = new WeakMap();   // textNode -> testo originale
  const written = new WeakMap();     // textNode -> ultimo testo scritto da noi
  const missing = new Set();
  const mtCache = new Map();
  let showOriginal = false;

  // --- Traduttore integrato di Chrome (on-device, Chrome 138+) come fallback ---
  // Se il modello di traduzione va ancora scaricato, Chrome richiede un gesto
  // dell'utente: lo creiamo al primo clic/tasto sulla pagina e intanto le
  // traduzioni in attesa restano in coda.
  const MT_OPTS = { sourceLanguage: "zh", targetLanguage: "it" };
  let resolveTr;
  const translatorP = new Promise(r => (resolveTr = r));
  (async () => {
    try {
      if (!("Translator" in self)) return resolveTr(null);
      const av = await Translator.availability(MT_OPTS);
      if (av === "unavailable") return resolveTr(null);
      if (av === "available") return resolveTr(await Translator.create(MT_OPTS));
      const onGesture = () => {
        ["pointerdown", "keydown"].forEach(t => removeEventListener(t, onGesture, true));
        toast("Download traduttore automatico…");
        Translator.create(MT_OPTS).then(t => { resolveTr(t); toast("Traduttore automatico pronto"); },
                                        () => resolveTr(null));
      };
      ["pointerdown", "keydown"].forEach(t => addEventListener(t, onGesture, true));
    } catch { resolveTr(null); }
  })();
  const getTranslator = () => translatorP;

  function translateSync(text) {
    const t = text.trim();
    if (!t || !HAS_HAN.test(t)) return null;
    if (DICT[t] != null) return text.replace(t, DICT[t]);
    let out = t;
    for (const k of PARTIAL) if (out.includes(k)) out = out.split(k).join(DICT[k]);
    if (!HAS_HAN.test(out)) return text.replace(t, out);
    return null; // non coperto dal dizionario
  }

  async function translateMT(t) {
    if (mtCache.has(t)) return mtCache.get(t);
    const tr = await getTranslator();
    if (!tr) return null;
    try {
      const r = await tr.translate(t);
      mtCache.set(t, r);
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
    if (showOriginal) return;
    // Tooltip nativo con il cinese originale (utile per cercare termini)
    if (!p.hasAttribute("title") && cur.trim().length < 80) {
      p.__hyOwnTitle = cur.trim();
      p.setAttribute("title", cur.trim());
    }

    const tr = translateSync(cur);
    if (tr != null) { setNode(node, tr); return; }

    const t = cur.trim();
    missing.add(t);
    translateMT(t).then(r => {
      if (r && node.nodeValue === cur && !showOriginal) setNode(node, cur.replace(t, r));
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
      if (showOriginal) continue;
      const apply = s => { el.__hyAttr = el.__hyAttr || {}; el.__hyAttr[a] = s; el.setAttribute(a, s); };
      const tr = translateSync(v);
      if (tr != null) { apply(tr); continue; }
      missing.add(v);
      translateMT(v.trim()).then(r => { if (r && el.getAttribute(a) === v) apply(r); });
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

  function restoreAll() {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) {
        const o = originals.get(n);
        if (o != null) setNode(n, o);
      } else if (n.__hyOrigAttr) {
        for (const [a, v] of Object.entries(n.__hyOrigAttr)) { n.__hyAttr[a] = v; n.setAttribute(a, v); }
      }
    }
  }

  // Scorciatoie:
  //  Alt+Shift+O  -> mostra/nasconde testo originale cinese
  //  Alt+Shift+M  -> copia negli appunti le stringhe non presenti nel dizionario
  document.addEventListener("keydown", e => {
    if (!e.altKey || !e.shiftKey) return;
    if (e.code === "KeyO") {
      showOriginal = !showOriginal;
      if (showOriginal) restoreAll();
      else walk(document.body);
      toast(showOriginal ? "Testo originale (cinese)" : "Traduzione attiva");
    } else if (e.code === "KeyM") {
      const obj = {};
      missing.forEach(s => { obj[s] = mtCache.get(s.trim()) || ""; });
      navigator.clipboard.writeText(JSON.stringify(obj, null, 2)).then(
        () => toast(`${missing.size} stringhe mancanti copiate`),
        () => { console.log("[Hunyuan IT] mancanti:", obj); toast("Vedi console"); }
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

  walk(document.body);
  observe(document.body);
  document.documentElement.lang = "it";
})();
