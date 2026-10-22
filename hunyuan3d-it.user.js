// ==UserScript==
// @name         Hunyuan 3D in italiano
// @namespace    https://github.com/amp-ita/hunyuan3d-it
// @version      1.3.0
// @description  Traduce l'interfaccia di 3d.hunyuan.tencent.com in italiano (dizionario + traduttore integrato di Chrome come fallback).
// @author       Marco
// @match        https://3d.hunyuan.tencent.com/*
// @run-at       document-idle
// @grant        none
// @homepageURL  https://github.com/amp-ita/hunyuan3d-it
// @updateURL    https://raw.githubusercontent.com/amp-ita/hunyuan3d-it/master/hunyuan3d-it.user.js
// @downloadURL  https://raw.githubusercontent.com/amp-ita/hunyuan3d-it/master/hunyuan3d-it.user.js
// ==/UserScript==

/* File generato da build_userscript.py: modifica dict.js / content.js / style.css, non questo. */

(() => {
  const s = document.createElement("style");
  s.id = "hy-it-style";
  s.textContent = `/* Notifica delle scorciatoie (Alt+Shift+O / Alt+Shift+M) */
.hy-it-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483647;
  padding: 8px 14px;
  border-radius: 8px;
  background: #222;
  color: #fff;
  font: 13px/1.4 system-ui, sans-serif;
  box-shadow: 0 4px 16px rgba(0, 0, 0, .3);
  pointer-events: none;
}

/* Il sito usa word-break: break-all (pensato per il cinese), che spezza le
   parole italiane a caso ("skinnin-g"). Si va a capo solo tra parole;
   una parola troppo lunga viene sillabata in italiano. */
html[lang="it"] * {
  word-break: normal !important;
  overflow-wrap: break-word !important;
}
html[lang="it"] .t-popup__content {
  hyphens: auto;
}

/* Etichette del menu laterale centrate */
html[lang="it"] a[href^="/studio/creation/"],
html[lang="it"] a[href^="/studio/creation/"] * {
  text-align: center !important;
  hyphens: manual !important;
}
`;
  (document.head || document.documentElement).appendChild(s);
})();

// Dizionario cinese -> italiano. Aggiungi pure voci qui.
// Le voci di 1 solo carattere vengono usate SOLO per corrispondenza esatta.
window.HY_DICT = {
  // --- Pipeline / menu laterale ---
  "概念设计": "Concept design",
  "几何生成": "Generazione geometria",
  "组件拆分": "Separazione componenti",
  "低模生成": "Low-poly",
  "UV展开": "UV unwrap",
  "纹理绘制": "Texturing",
  "绑骨蒙皮": "Rigging e skinning",
  "动画生成": "Animazione",
  "今日剩余生成次数：": "Generazioni rimaste oggi: ",
  "今日剩余生成次数": "Generazioni rimaste oggi",

  // --- Tooltip del menu laterale ---
  "通过文本/图片生成3D设计图，支持标准化Pose和风格化生成":
    "Genera concept 3D da testo o immagine, con posa standard o stile stilizzato",
  "快速生成丰富细节的高质量几何模型":
    "Genera rapidamente geometrie di alta qualità e ricche di dettagli",
  "对生成的3D模型自动拆分组件，支持组件合并和边界调整":
    "Separa automaticamente il modello in componenti; puoi unirli e regolarne i confini",
  "一键生成布线规整、符合专业美术标准的低模，面数随物体复杂度灵活可调，同时兼容高模或图像输入，输出形式覆盖三角面与四边面":
    "Low-poly con un clic, topologia pulita da standard professionale. Numero di facce regolabile in base alla complessità; accetta in ingresso high-poly o immagini; output a triangoli o quad",
  "低模拓扑：输入高模（AI高模、扫描资产等）进行智能拓扑，获得专业管线可用的低模":
    "Retopologia: carica un high-poly (da AI, scansioni…) e ottieni un low-poly pronto per pipeline professionali",
  "自动化生成高质量UV切线模型": "Genera automaticamente UV di alta qualità con seam",
  "通过文本/图片生成PBR质感纹理，支持文本和图片控制的纹理编辑/材质球编辑":
    "Genera texture PBR da testo o immagine; modifica texture e materiali guidata da testo o immagini",
  "对模型进行自动化骨骼蒙皮预测，并生成带骨骼蒙皮的3D模型。":
    "Crea automaticamente scheletro e skinning e genera il modello 3D riggato.",
  "道具类等非人形角色模型，不支持绑骨蒙皮。": "Oggetti e modelli non umanoidi non supportano il rigging.",
  "基于绑骨蒙皮模型，通过文本/视频或选择动作模版生成动画，只支持标准A/Tpose姿态人形角色驱动。":
    "Anima un modello riggato partendo da testo, video o un template di movimento. Solo personaggi umanoidi in A-pose/T-pose standard.",
  "道具类等非角色模型，不支持动画生成。": "Oggetti e modelli che non sono personaggi non possono essere animati.",

  // --- Pannelli ---
  "资产": "Asset",
  "图层": "Livelli",
  "属性": "Proprietà",
  "历史记录": "Cronologia",
  "批量操作": "Operazioni multiple",
  "下载": "Scarica",
  "本地模型": "Modello locale",
  "模型面数": "N. facce",
  "顶点数": "N. vertici",
  "地面网格": "Griglia pavimento",
  "已运行节点": "Nodi eseguiti",
  "无选择": "Nessuna selezione",
  "立即生成": "Genera ora",
  "选择模型": "Scegli modello",
  "指南": "Guida",

  // --- Concept / geometria ---
  "文生图": "Da testo",
  "图生多视图": "Da immagine",
  "标准化A-pose": "A-pose standard",
  "风格化": "Stilizzato",
  "如需对角色进行动作驱动，建议打开此开关": "Attivalo se vuoi poi animare il personaggio",
  "请输入想要生成的内容。建议以单主体为主。例如：一个战士英雄，手持战锤，蒸汽朋克风格":
    "Descrivi cosa generare (meglio un solo soggetto). Es.: un eroe guerriero con martello da guerra, stile steampunk",
  "或选择本地上传": "o carica dal PC",
  "上传单图": "Singola",
  "上传多视图": "Multi-vista",
  "3D生成": "Generazione 3D",

  // --- Low poly ---
  "低模拓扑": "Retopologia low-poly",
  "拓扑选择": "Tipo di topologia",
  "拓扑": "Topologia",
  "三角面": "Triangoli",
  "四边面": "Quad",
  "低": "Bassa",
  "中": "Media",
  "高": "Alta",

  // --- Texture ---
  "文生纹理": "Da testo",
  "图生纹理": "Da immagine",
  "神奇笔刷": "Pennello",
  "图片上传建议": "Consigli per le immagini",
  "重绘纹理": "Ridipingi texture",
  "生成材质Mask": "Genera mask materiali",

  // --- Rigging / requisiti modello ---
  "上传模型要求": "Requisiti del modello",
  "人形角色": "Personaggio umanoide",
  "姿态：标准 APose 或 TPose": "Posa: A-pose o T-pose standard",
  "模型：模型中不应包含骨骼，以及人体以外的组件(如武器、坐骑、翅膀等)，避免松散衣物、配饰及复杂发型":
    "Modello: niente scheletro né parti non umane (armi, cavalcature, ali…); evita vestiti larghi, accessori e capigliature complesse",
  "朝向：模型Y轴向上，Z轴向前（如图示意）": "Orientamento: asse Y in alto, Z in avanti (vedi figura)",
  "其他：模型不能包含动画数据（无动画K帧）": "Altro: nessun dato di animazione (niente keyframe)",
  "💡请确保上传的资产仅包含单个个体，且模型轴向对齐，几何结构无粘连或错误连接":
    "💡 L'asset deve contenere un solo soggetto, con assi allineati e geometria senza compenetrazioni o connessioni errate",
  "上传模型": "Carica modello",
  "选择角色": "Scegli personaggio",
  "动画模板": "Template animazioni",

  // --- Animazioni ---
  "回旋踢": "Calcio rotante",
  "左勾拳": "Gancio sinistro",
  "蓄力攻击": "Attacco caricato",
  "蓄力出拳": "Pugno caricato",
  "二连击打": "Doppio colpo",
  "后撤": "Indietreggia",
  "受击倒地": "Colpito e a terra",
  "受击": "Colpito",
  "落地": "Atterraggio",
  "沮丧": "Abbattuto",
  "刺拳": "Jab",
  "连续击打": "Raffica di colpi",
  "踢腿": "Calcio",
  "侧踢": "Calcio laterale",
  "打太极": "Tai chi",
  "后空翻": "Salto mortale indietro",
  "蹲姿转体": "Rotazione accovacciato",
  "走路": "Camminata",
  "待机": "Idle",
  "街舞": "Hip hop",
  "扭扭舞": "Twist",
  "左转弯": "Curva a sinistra",
  "右转弯": "Curva a destra",
  "慢跑": "Corsa leggera",
  "奔跑": "Corsa",
  "冲刺跑": "Scatto",
  "原地跳": "Salto sul posto",
  "滑铲": "Scivolata",
  "向前大跳": "Grande salto in avanti",
  "跨越": "Scavalcare",
  "恐吓": "Intimidire",
  "向前跌倒": "Caduta in avanti",
  "右转": "Gira a destra",
  "转身": "Voltarsi",
  "发送冲击波": "Onda d'urto",

  // --- Termini generici frequenti ---
  "生成中": "In generazione…",
  "排队中": "In coda…",
  "生成失败": "Generazione fallita",
  "生成成功": "Generazione completata",
  "重新生成": "Rigenera",
  "生成": "Genera",
  "取消": "Annulla",
  "确定": "OK",
  "确认": "Conferma",
  "删除": "Elimina",
  "重命名": "Rinomina",
  "导出": "Esporta",
  "导入": "Importa",
  "上传": "Carica",
  "上传图片": "Carica immagine",
  "设置": "Impostazioni",
  "登录": "Accedi",
  "退出登录": "Esci",
  "帮助": "Aiuto",
  "复制": "Copia",
  "分享": "Condividi",
  "收藏": "Preferiti",
  "全选": "Seleziona tutto",
  "重试": "Riprova",
  "预览": "Anteprima",
  "保存": "Salva",
  "关闭": "Chiudi",
  "返回": "Indietro",
  "完成": "Fatto",
  "白模": "Modello senza texture",
  "贴图": "Texture",
  "材质": "Materiale",
  "纹理": "Texture",
  "网格": "Mesh",
  "格式": "Formato",
  "提示词": "Prompt",
  "负向提示词": "Prompt negativo",
  "正面": "Fronte",
  "背面": "Retro",
  "左侧": "Sinistra",
  "右侧": "Destra",
  "左视图": "Vista sinistra",
  "右视图": "Vista destra",
  "前视图": "Vista frontale",
  "后视图": "Vista posteriore",
  "积分": "Crediti",
  "次": " volte"
};

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
