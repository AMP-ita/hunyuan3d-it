// ==UserScript==
// @name         Hunyuan 3D Translator (EN/IT)
// @namespace    https://github.com/amp-ita/hunyuan3d-it
// @version      1.3.10
// @description  Translates the 3d.hunyuan.tencent.com interface into English or Italian (built-in dictionary, Chrome's on-device translator as fallback). Alt+Shift+L switches language.
// @author       Ares9323
// @match        https://3d.hunyuan.tencent.com/*
// @run-at       document-idle
// @grant        none
// @homepageURL  https://github.com/amp-ita/hunyuan3d-it
// @updateURL    https://raw.githubusercontent.com/amp-ita/hunyuan3d-it/master/hunyuan3d-it.user.js
// @downloadURL  https://raw.githubusercontent.com/amp-ita/hunyuan3d-it/master/hunyuan3d-it.user.js
// ==/UserScript==

/* File generato da build_userscript.py: modifica dict.js / dict.en.js / content.js / style.css, non questo. */

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
:is(html[lang="it"], html[lang="en"]) * {
  word-break: normal !important;
  overflow-wrap: break-word !important;
}
:is(html[lang="it"], html[lang="en"]) .t-popup__content {
  hyphens: auto;
}

/* Etichette del menu laterale centrate */
:is(html[lang="it"], html[lang="en"]) a[href^="/studio/creation/"],
:is(html[lang="it"], html[lang="en"]) a[href^="/studio/creation/"] * {
  text-align: center !important;
  hyphens: manual !important;
}

/* Schede del selettore (es. "Text to texture"): vanno a capo invece di sovrapporsi */
:is(html[lang="it"], html[lang="en"]) .tab-selector .t-radio-button,
:is(html[lang="it"], html[lang="en"]) .tab-selector .t-radio-button__label {
  white-space: normal !important;
  text-align: center;
  line-height: 1.2;
  justify-content: center;
}

/* Etichette delle schede nella finestra multi-vista centrate */
:is(html[lang="it"], html[lang="en"]) [class*="gradient-dashed-box"] span[class*="text-[12px]"] {
  text-align: center;
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
  "次": " volte",

  // --- Stati, upload e multi-vista ---
  "加载中...": "Caricamento...",
  "您未选择模型哦~": "Nessun modello selezionato",
  "请在右侧资产库中选择或上传模型": "Scegli o carica un modello dalla libreria a destra",
  "支持FBX, GLB, OBJ格式，布线规整，面数小于3万，组件数量小于100个":
    "Formati supportati: FBX, GLB, OBJ. Topologia pulita, meno di 30.000 facce, meno di 100 componenti",
  "图片检测中...": "Verifica dell'immagine...",
  "上传中...": "Caricamento...",
  "法线": "Normali",
  "智能展开UV": "Unwrap UV intelligente",
  "支持png/jpg/jpeg/webp格式，文件大小最大不超过10M，分辨率最低要求128*128，最高限制4096*4096":
    "Formati supportati: png/jpg/jpeg/webp. Dimensione massima 10 MB, risoluzione da 128*128 a 4096*4096",
  "敬请期待": "In arrivo",
  "添加多视图（Min2，Max8）": "Aggiungi viste (min 2, max 8)",
  "添加多视图": "Aggiungi viste",
  "3D角色模型预览": "Anteprima del personaggio 3D",
  "上传正图": "Vista frontale",
  "上传背图": "Vista posteriore",
  "上传左图": "Vista sinistra",
  "上传右图": "Vista destra",
  "上传顶图": "Vista dall'alto",
  "上传底图": "Vista dal basso",
  "上传左45°图": "Sinistra 45°",
  "上传右45°图": "Destra 45°",

  // --- Home, footer e creazione 3D ---
  "腾讯混元3D": "Tencent Hunyuan 3D",
  "所有内容均由AI生成仅供参考 请阅读并知悉": "Tutti i contenuti sono generati dall'IA e hanno valore puramente indicativo. Leggi e prendi atto",
  "《腾讯混元3D服务协议》": "《Condizioni di servizio di Tencent Hunyuan 3D》",
  "《腾讯混元3D隐私协议》": "《Informativa sulla privacy di Tencent Hunyuan 3D》",
  "3D创作": "Creazione 3D",
  "3D场景 · 全景图": "Scena 3D · Panorama",
  "生成完成，点击可查看结果": "Generazione completata, clicca per vedere il risultato",
  "3D场景 · 世界生成": "Scena 3D · Generazione del mondo",
  "3D场景 · 世界重建": "Scena 3D · Ricostruzione del mondo",
  "文生3D": "Testo in 3D",
  "图生3D": "Immagine in 3D",
  "请输入想要生成的内容。建议以单主体为主。例如：一只棕色的猫雕塑，尾巴卷曲，卡通风格":
    "Descrivi cosa vuoi generare. Meglio con un solo soggetto. Esempio: scultura di un gatto marrone con la coda arricciata, stile cartoon",
  "单张图片": "Immagine singola",
  "多张图片": "Più immagini",
  "支持png/jpg/jpeg/webp格式，图片大小最大不超过10M、分辨率最低要求128x128":
    "Formati supportati: png/jpg/jpeg/webp. Dimensione massima 10 MB, risoluzione minima 128x128",
  "图/文生3D": "Testo/immagine in 3D",
  "颈挂式耳机，漫步者，白色": "Cuffie con archetto da collo, Edifier, bianche",
  "使用帮助": "Guida all'uso",
  "意见反馈": "Feedback",

  // --- Texture: placeholder ed esempi ---
  "请描述纹理材质细节，如一个拥有金色长发、头戴红色蝴蝶结，身穿蓝金配色的连衣裙与银色护甲，搭配棕色腰带与长靴的动漫女性手办":
    "Descrivi i dettagli di texture e materiale. Esempio: una figure anime femminile con lunghi capelli biondi, fiocco rosso, abito blu e oro con armatura argentata, cintura marrone e stivali lunghi",
  "试试一下结构描述：": "Prova una descrizione strutturata:",
  "单主体": "Soggetto singolo",
  "动漫女性手办": "figure anime femminile",
  "纹理材质细节": "Dettagli di texture e materiale",
  "金色长发、头戴红色蝴蝶结，身穿蓝金配色的连衣裙与银色护甲，搭配棕色腰带与长靴":
    "lunghi capelli biondi, fiocco rosso, abito blu e oro con armatura argentata, cintura marrone e stivali lunghi",
  "效果示例：": "Esempio di risultato:",
  "材质球": "Materiale",
  "请先选择或上传模型": "Seleziona o carica prima un modello",
  "描述平面材质的文本，不包括几何或光照，描述图案设计，材质颜色，材质种类（如金属）。如：充满活力的柑橘元素启发的织物设计：以白色为基底，点缀着欢快的橙色水果图案，再搭配上质朴的绿色和灰色树叶，营造出清新、夏日般的视觉效果。":
    "Descrivi il materiale piatto senza geometria né illuminazione: disegno del motivo, colore e tipo di materiale (ad esempio metallo). Esempio: un tessuto ispirato agli agrumi, con base bianca, vivaci frutti arancioni e foglie verdi e grigie dal carattere rustico, per un effetto fresco e estivo.",
  "请描述材质特征": "Descrivi le caratteristiche del materiale",
  "模型UV岛数量不可大于150": "Il modello non può avere più di 150 isole UV",

  // --- Home: benvenuto, funzioni, galleria, note di versione ---
  "欢迎来到": "Benvenuto in",
  "登录后开启3D创作之旅": "Accedi per iniziare il tuo viaggio nella creazione 3D",
  "腾讯混元": "Tencent Hunyuan",
  "一键实现3D创意，开启专业设计新纪元": "Realizza le tue idee 3D con un clic e apri una nuova era del design professionale",
  "端到端几何+纹理生成，": "Generazione end-to-end di geometria e texture: ",
  "几何表面更整洁，纹理贴图更细腻": "superfici più pulite e texture più raffinate",
  "立即开始": "Inizia ora",
  "开始": "Inizia",
  "3D世界模型": "Modello di mondo 3D",
  "用文字或图片创建你的3D世界": "Crea il tuo mondo 3D da testo o immagini",
  "高模生成": "Generazione high-poly",
  "生成高精度模型": "Genera modelli ad alta precisione",
  "智能化分割模型组件": "Separazione intelligente dei componenti del modello",
  "美术级低模智能生成，兼容图片或高模输入": "Low-poly di qualità artistica generato in automatico; accetta immagini o high-poly in ingresso",
  "语义UV": "UV semantiche",
  "一键实现语义UV展开": "Unwrap UV semantico con un clic",
  "高质量PBR纹理生成": "Generazione di texture PBR di alta qualità",
  "基于指令或视频输入自动生成3D动画序列": "Genera automaticamente sequenze di animazione 3D da istruzioni o video",
  "灵感广场": "Galleria di ispirazioni",
  "全部节点": "Tutti i nodi",
  "全部": "Tutti",
  "角色": "Personaggi",
  "道具": "Oggetti di scena",
  "武器": "Armi",
  "生物": "Creature",
  "植物": "Piante",
  "载具": "Veicoli",
  "家居": "Arredamento",
  "建筑": "Architettura",
  "暂无相关案例": "Nessun esempio disponibile",
  "组件分割": "Segmentazione componenti",
  "一辆摩托车": "Una moto",
  "版本说明": "Note di versione",
  "v3.1版本": "Versione v3.1",
  "几何更精细，纹理颜色更还原，支持更多参考视图可控生成": "Geometria più dettagliata, colori delle texture più fedeli e generazione controllata con più viste di riferimento",
  "v3.0版本": "Versione v3.0",
  "36亿建模体素，复杂物体高精建模，大幅提升人物生成效果": "3,6 miliardi di voxel di modellazione: alta precisione sugli oggetti complessi e personaggi molto più riusciti",

  // --- Suggerimenti immagine e stato di generazione ---
  "背景简单（尽量纯色）": "Sfondo semplice (meglio a tinta unita)",
  "不包含文字": "Senza testo",
  "主体不要过小": "Il soggetto non deve essere troppo piccolo",
  "几何": "Geometria",
  "生成中，预计还需": "Generazione in corso, tempo stimato: ",
  "%d 秒": "%d secondi",
  "当前排队中，前方%d个任务": "In coda, attività davanti a te: %d",
  "将在大概%d 秒后开始": "Partenza tra circa %d secondi",
  "粉色蝴蝶结": "Fiocco rosa",
  "请至少上传两张标准视角图片，其中正视图为必须": "Carica almeno due immagini da viste standard; la vista frontale è obbligatoria",
  "请至少上传两张标准视角图片": "Carica almeno due immagini da viste standard",
  "重新上传": "Carica di nuovo",
  "模型生成中": "Generazione del modello in corso",

  // --- Viewer 3D: feedback, vista e luci ---
  "点赞": "Mi piace",
  "点踩": "Non mi piace",
  "自动旋转": "Rotazione automatica",
  "线框+白模": "Wireframe + modello senza texture",
  "反照率": "Albedo",
  "场景设置": "Impostazioni scena",
  "角度": "Angolo",
  "射灯色值": "Colore del faretto",
  "射灯强度": "Intensità del faretto",
  "弱": "Bassa",
  "强": "Alta",
  "平面光强度": "Intensità della luce piana",

  // --- Asset, riferimenti, note di versione v3.6 e segmentazione ---
  "资产删除后将无法恢复，确认删除吗？": "Una volta eliminato, l'asset non potrà essere recuperato. Confermi l'eliminazione?",
  "参考图": "Immagine di riferimento",
  "v3.6版本：": "Versione v3.6:",
  "几何表面更整洁，结构更清晰，材质贴图更高质": "Superfici geometriche più pulite, struttura più chiara e texture di qualità superiore",
  "几何表面更整洁，结构更清晰，材质贴图更高质量": "Superfici geometriche più pulite, struttura più chiara e texture di qualità superiore",
  "单主体人物、正面、全身": "Personaggio singolo, di fronte, a figura intera",
  "释放鼠标": "Rilascia il mouse",
  "模型分割": "Segmentazione modello",
  "预分割": "Pre-segmentazione",
  "模型面数不可大于3万": "Il modello non può avere più di 30.000 facce",
  "支持FBX, GLB, OBJ格式": "Formati supportati: FBX, GLB, OBJ",
  "支持.FBX, .GLB, .OBJ格式": "Formati supportati: .FBX, .GLB, .OBJ",

  // --- Topologia, A-pose e creazione da prompt ---
  "模型已拓扑": "Modello già retopologizzato",
  "低面数：": "Poche facce:",
  "中面数：": "Facce medie:",
  "高面数：": "Molte facce:",
  "v1.5版本-首个原生四边面拓扑模型，布线规整度进一步提升": "Versione v1.5: primo modello con topologia nativa a quad, con una pulizia dei bordi ancora migliore",
  "支持FBX, GLB, OBJ格式，面数小于10万": "Formati supportati: FBX, GLB, OBJ. Meno di 100.000 facce",
  "标准化A-pose（只针对角色）": "A-pose standard (solo per personaggi)",
  "对输入的prompt生成的全身人像转换为标准A-pose姿态（建议输入真人正面站立图像，四肢未遮挡，无附加物品（如手提包、武器装备、篮球、足球），头发不过肩，衣服合身，无宽松长袖、长裙、古装等）": "Converte in A-pose standard la figura intera generata dal prompt (consigliata una foto frontale di una persona in piedi, con gli arti liberi e senza oggetti aggiuntivi come borse, armi, palloni da basket o da calcio, capelli non oltre le spalle, vestiti aderenti, senza maniche lunghe larghe, gonne lunghe o abiti d'epoca)",
  "请输入提示词": "Inserisci il prompt",
  "骑士": "Cavaliere",
  "特征（可选）": "Caratteristiche (facoltativo)",
  "穿戴中世纪铠甲": "Indossa un'armatura medievale",
  "风格（可选）": "Stile (facoltativo)",
  "卡通": "Cartoon",
  "仅限人物角色，支持png/jpg/jpeg/webp格式，文件大小最大不超过10M，分辨率最低要求128*128，最高限制4096*4096": "Solo personaggi. Formati supportati: png/jpg/jpeg/webp. Dimensione massima 10 MB, risoluzione da 128*128 a 4096*4096"
};

// Dictionary Chinese -> English. Keys must match dict.js; add entries to both.
// Single-character entries are used for exact matches ONLY.
window.HY_DICT_EN = {
  // --- Pipeline / side menu ---
  "概念设计": "Concept design",
  "几何生成": "Geometry generation",
  "组件拆分": "Component split",
  "低模生成": "Low-poly",
  "UV展开": "UV unwrap",
  "纹理绘制": "Texturing",
  "绑骨蒙皮": "Rigging & skinning",
  "动画生成": "Animation",
  "今日剩余生成次数：": "Generations left today: ",
  "今日剩余生成次数": "Generations left today",

  // --- Side menu tooltips ---
  "通过文本/图片生成3D设计图，支持标准化Pose和风格化生成":
    "Generate 3D concept art from text or an image, with a standard pose or a stylized look",
  "快速生成丰富细节的高质量几何模型":
    "Quickly generate high-quality, highly detailed geometry",
  "对生成的3D模型自动拆分组件，支持组件合并和边界调整":
    "Automatically split the model into components; you can merge them and adjust their boundaries",
  "一键生成布线规整、符合专业美术标准的低模，面数随物体复杂度灵活可调，同时兼容高模或图像输入，输出形式覆盖三角面与四边面":
    "One-click low-poly with clean topology to professional standards. Face count adjusts to object complexity; accepts high-poly or image input; outputs triangles or quads",
  "低模拓扑：输入高模（AI高模、扫描资产等）进行智能拓扑，获得专业管线可用的低模":
    "Retopology: feed in a high-poly (AI-generated, scans, etc.) and get a low-poly ready for professional pipelines",
  "自动化生成高质量UV切线模型": "Automatically generate high-quality UVs with seams",
  "通过文本/图片生成PBR质感纹理，支持文本和图片控制的纹理编辑/材质球编辑":
    "Generate PBR textures from text or an image; edit textures and materials guided by text or images",
  "对模型进行自动化骨骼蒙皮预测，并生成带骨骼蒙皮的3D模型。":
    "Automatically predict the skeleton and skinning and generate a rigged 3D model.",
  "道具类等非人形角色模型，不支持绑骨蒙皮。": "Props and other non-humanoid models do not support rigging.",
  "基于绑骨蒙皮模型，通过文本/视频或选择动作模版生成动画，只支持标准A/Tpose姿态人形角色驱动。":
    "Animate a rigged model from text, video or a motion template. Only humanoid characters in a standard A-pose/T-pose are supported.",
  "道具类等非角色模型，不支持动画生成。": "Props and other non-character models cannot be animated.",

  // --- Panels ---
  "资产": "Assets",
  "图层": "Layers",
  "属性": "Properties",
  "历史记录": "History",
  "批量操作": "Batch actions",
  "下载": "Download",
  "本地模型": "Local model",
  "模型面数": "Face count",
  "顶点数": "Vertex count",
  "地面网格": "Ground grid",
  "已运行节点": "Nodes run",
  "无选择": "No selection",
  "立即生成": "Generate now",
  "选择模型": "Select model",
  "指南": "Guide",

  // --- Concept / geometry ---
  "文生图": "Text to image",
  "图生多视图": "Image to multi-view",
  "标准化A-pose": "Standard A-pose",
  "风格化": "Stylized",
  "如需对角色进行动作驱动，建议打开此开关": "Turn this on if you plan to animate the character",
  "请输入想要生成的内容。建议以单主体为主。例如：一个战士英雄，手持战锤，蒸汽朋克风格":
    "Describe what to generate (a single subject works best). E.g.: a warrior hero holding a war hammer, steampunk style",
  "或选择本地上传": "or upload from your computer",
  "上传单图": "Single image",
  "上传多视图": "Multi-view",
  "3D生成": "3D generation",

  // --- Low poly ---
  "低模拓扑": "Low-poly retopology",
  "拓扑选择": "Topology type",
  "拓扑": "Topology",
  "三角面": "Triangles",
  "四边面": "Quads",
  "低": "Low",
  "中": "Medium",
  "高": "High",

  // --- Texture ---
  "文生纹理": "Text to texture",
  "图生纹理": "Image to texture",
  "神奇笔刷": "Magic brush",
  "图片上传建议": "Image upload tips",
  "重绘纹理": "Repaint texture",
  "生成材质Mask": "Generate material mask",

  // --- Rigging / model requirements ---
  "上传模型要求": "Model requirements",
  "人形角色": "Humanoid character",
  "姿态：标准 APose 或 TPose": "Pose: standard A-pose or T-pose",
  "模型：模型中不应包含骨骼，以及人体以外的组件(如武器、坐骑、翅膀等)，避免松散衣物、配饰及复杂发型":
    "Model: no skeleton and no non-human parts (weapons, mounts, wings, etc.); avoid loose clothing, accessories and complex hairstyles",
  "朝向：模型Y轴向上，Z轴向前（如图示意）": "Orientation: Y axis up, Z axis forward (see figure)",
  "其他：模型不能包含动画数据（无动画K帧）": "Other: no animation data (no animation keyframes)",
  "💡请确保上传的资产仅包含单个个体，且模型轴向对齐，几何结构无粘连或错误连接":
    "💡 Make sure the asset contains a single subject, with aligned axes and geometry free of merged or wrongly connected parts",
  "上传模型": "Upload model",
  "选择角色": "Select character",
  "动画模板": "Animation templates",

  // --- Animations ---
  "回旋踢": "Roundhouse kick",
  "左勾拳": "Left hook",
  "蓄力攻击": "Charged attack",
  "蓄力出拳": "Charged punch",
  "二连击打": "Double strike",
  "后撤": "Step back",
  "受击倒地": "Hit and knocked down",
  "受击": "Hit reaction",
  "落地": "Landing",
  "沮丧": "Dejected",
  "刺拳": "Jab",
  "连续击打": "Strike combo",
  "踢腿": "Kick",
  "侧踢": "Side kick",
  "打太极": "Tai chi",
  "后空翻": "Backflip",
  "蹲姿转体": "Crouch spin",
  "走路": "Walk",
  "待机": "Idle",
  "街舞": "Hip hop",
  "扭扭舞": "Twist dance",
  "左转弯": "Turn left",
  "右转弯": "Turn right",
  "慢跑": "Jog",
  "奔跑": "Run",
  "冲刺跑": "Sprint",
  "原地跳": "Jump in place",
  "滑铲": "Slide tackle",
  "向前大跳": "Long jump forward",
  "跨越": "Vault",
  "恐吓": "Intimidate",
  "向前跌倒": "Fall forward",
  "右转": "Turn right",
  "转身": "Turn around",
  "发送冲击波": "Shockwave",

  // --- Common terms ---
  "生成中": "Generating…",
  "排队中": "Queued…",
  "生成失败": "Generation failed",
  "生成成功": "Generation complete",
  "重新生成": "Regenerate",
  "生成": "Generate",
  "取消": "Cancel",
  "确定": "OK",
  "确认": "Confirm",
  "删除": "Delete",
  "重命名": "Rename",
  "导出": "Export",
  "导入": "Import",
  "上传": "Upload",
  "上传图片": "Upload image",
  "设置": "Settings",
  "登录": "Log in",
  "退出登录": "Log out",
  "帮助": "Help",
  "复制": "Copy",
  "分享": "Share",
  "收藏": "Favorites",
  "全选": "Select all",
  "重试": "Retry",
  "预览": "Preview",
  "保存": "Save",
  "关闭": "Close",
  "返回": "Back",
  "完成": "Done",
  "白模": "Untextured model",
  "贴图": "Texture",
  "材质": "Material",
  "纹理": "Texture",
  "网格": "Mesh",
  "格式": "Format",
  "提示词": "Prompt",
  "负向提示词": "Negative prompt",
  "正面": "Front",
  "背面": "Back",
  "左侧": "Left",
  "右侧": "Right",
  "左视图": "Left view",
  "右视图": "Right view",
  "前视图": "Front view",
  "后视图": "Back view",
  "积分": "Credits",
  "次": " times",

  // --- States, upload and multi-view ---
  "加载中...": "Loading...",
  "您未选择模型哦~": "No model selected",
  "请在右侧资产库中选择或上传模型": "Select or upload a model from the asset library on the right",
  "支持FBX, GLB, OBJ格式，布线规整，面数小于3万，组件数量小于100个":
    "Supported formats: FBX, GLB, OBJ. Clean topology, under 30,000 faces, under 100 components",
  "图片检测中...": "Checking image...",
  "上传中...": "Uploading...",
  "法线": "Normals",
  "智能展开UV": "Smart UV unwrap",
  "支持png/jpg/jpeg/webp格式，文件大小最大不超过10M，分辨率最低要求128*128，最高限制4096*4096":
    "Supported formats: png/jpg/jpeg/webp. Max file size 10 MB, resolution from 128*128 to 4096*4096",
  "敬请期待": "Coming soon",
  "添加多视图（Min2，Max8）": "Add views (min 2, max 8)",
  "添加多视图": "Add views",
  "3D角色模型预览": "3D character preview",
  "上传正图": "Front view",
  "上传背图": "Back view",
  "上传左图": "Left view",
  "上传右图": "Right view",
  "上传顶图": "Top view",
  "上传底图": "Bottom view",
  "上传左45°图": "Left 45°",
  "上传右45°图": "Right 45°",

  // --- Home, footer and 3D creation ---
  "腾讯混元3D": "Tencent Hunyuan 3D",
  "所有内容均由AI生成仅供参考 请阅读并知悉": "All content is AI-generated and for reference only. Please read and acknowledge",
  "《腾讯混元3D服务协议》": "《Tencent Hunyuan 3D Terms of Service》",
  "《腾讯混元3D隐私协议》": "《Tencent Hunyuan 3D Privacy Policy》",
  "3D创作": "3D creation",
  "3D场景 · 全景图": "3D scene · Panorama",
  "生成完成，点击可查看结果": "Generation complete, click to view the result",
  "3D场景 · 世界生成": "3D scene · World generation",
  "3D场景 · 世界重建": "3D scene · World reconstruction",
  "文生3D": "Text to 3D",
  "图生3D": "Image to 3D",
  "请输入想要生成的内容。建议以单主体为主。例如：一只棕色的猫雕塑，尾巴卷曲，卡通风格":
    "Describe what you want to generate. A single main subject works best. Example: a brown cat sculpture with a curled tail, cartoon style",
  "单张图片": "Single image",
  "多张图片": "Multiple images",
  "支持png/jpg/jpeg/webp格式，图片大小最大不超过10M、分辨率最低要求128x128":
    "Supported formats: png/jpg/jpeg/webp. Max size 10 MB, minimum resolution 128x128",
  "图/文生3D": "Text/image to 3D",
  "颈挂式耳机，漫步者，白色": "Neckband headphones, Edifier, white",
  "使用帮助": "Help",
  "意见反馈": "Feedback",

  // --- Texture: placeholder and examples ---
  "请描述纹理材质细节，如一个拥有金色长发、头戴红色蝴蝶结，身穿蓝金配色的连衣裙与银色护甲，搭配棕色腰带与长靴的动漫女性手办":
    "Describe the texture and material details. Example: an anime female figure with long blonde hair, a red bow, a blue and gold dress with silver armor, a brown belt and long boots",
  "试试一下结构描述：": "Try a structured description:",
  "单主体": "Single subject",
  "动漫女性手办": "anime female figure",
  "纹理材质细节": "Texture and material details",
  "金色长发、头戴红色蝴蝶结，身穿蓝金配色的连衣裙与银色护甲，搭配棕色腰带与长靴":
    "long blonde hair, a red bow, a blue and gold dress with silver armor, a brown belt and long boots",
  "效果示例：": "Example result:",
  "材质球": "Material",
  "请先选择或上传模型": "Select or upload a model first",
  "描述平面材质的文本，不包括几何或光照，描述图案设计，材质颜色，材质种类（如金属）。如：充满活力的柑橘元素启发的织物设计：以白色为基底，点缀着欢快的橙色水果图案，再搭配上质朴的绿色和灰色树叶，营造出清新、夏日般的视觉效果。":
    "Describe a flat material without geometry or lighting: pattern design, material color and material type (e.g. metal). Example: a fabric design inspired by citrus, with a white base, cheerful orange fruit motifs and rustic green and gray leaves, for a fresh, summery look.",
  "请描述材质特征": "Describe the material features",
  "模型UV岛数量不可大于150": "The model cannot have more than 150 UV islands",

  // --- Home: welcome, features, gallery, release notes ---
  "欢迎来到": "Welcome to",
  "登录后开启3D创作之旅": "Log in to start your 3D creation journey",
  "腾讯混元": "Tencent Hunyuan",
  "一键实现3D创意，开启专业设计新纪元": "Turn your 3D ideas into reality with one click and enter a new era of professional design",
  "端到端几何+纹理生成，": "End-to-end geometry and texture generation: ",
  "几何表面更整洁，纹理贴图更细腻": "cleaner surfaces and finer texture maps",
  "立即开始": "Get started",
  "开始": "Start",
  "3D世界模型": "3D world model",
  "用文字或图片创建你的3D世界": "Create your 3D world from text or images",
  "高模生成": "High-poly generation",
  "生成高精度模型": "Generate high-precision models",
  "智能化分割模型组件": "Intelligently split model components",
  "美术级低模智能生成，兼容图片或高模输入": "Art-grade low-poly generated automatically; accepts image or high-poly input",
  "语义UV": "Semantic UV",
  "一键实现语义UV展开": "One-click semantic UV unwrapping",
  "高质量PBR纹理生成": "High-quality PBR texture generation",
  "基于指令或视频输入自动生成3D动画序列": "Automatically generate 3D animation sequences from instructions or video",
  "灵感广场": "Inspiration gallery",
  "全部节点": "All nodes",
  "全部": "All",
  "角色": "Characters",
  "道具": "Props",
  "武器": "Weapons",
  "生物": "Creatures",
  "植物": "Plants",
  "载具": "Vehicles",
  "家居": "Furniture",
  "建筑": "Architecture",
  "暂无相关案例": "No examples yet",
  "组件分割": "Component segmentation",
  "一辆摩托车": "A motorcycle",
  "版本说明": "Release notes",
  "v3.1版本": "Version v3.1",
  "几何更精细，纹理颜色更还原，支持更多参考视图可控生成": "Finer geometry, more faithful texture colors, and controllable generation with more reference views",
  "v3.0版本": "Version v3.0",
  "36亿建模体素，复杂物体高精建模，大幅提升人物生成效果": "3.6 billion modeling voxels: high-precision modeling of complex objects and much better character results",

  // --- Image tips and generation status ---
  "背景简单（尽量纯色）": "Simple background (preferably solid color)",
  "不包含文字": "No text",
  "主体不要过小": "The subject should not be too small",
  "几何": "Geometry",
  "生成中，预计还需": "Generating, estimated time left: ",
  "%d 秒": "%d seconds",
  "当前排队中，前方%d个任务": "In queue, tasks ahead of you: %d",
  "将在大概%d 秒后开始": "Starting in about %d seconds",
  "粉色蝴蝶结": "Pink bow",
  "请至少上传两张标准视角图片，其中正视图为必须": "Upload at least two standard-view images; the front view is required",
  "请至少上传两张标准视角图片": "Upload at least two standard-view images",
  "重新上传": "Upload again",
  "模型生成中": "Generating model",

  // --- 3D viewer: feedback, view and lights ---
  "点赞": "Like",
  "点踩": "Dislike",
  "自动旋转": "Auto-rotate",
  "线框+白模": "Wireframe + untextured model",
  "反照率": "Albedo",
  "场景设置": "Scene settings",
  "角度": "Angle",
  "射灯色值": "Spotlight color",
  "射灯强度": "Spotlight intensity",
  "弱": "Low",
  "强": "High",
  "平面光强度": "Flat light intensity",

  // --- Assets, references, v3.6 release notes and segmentation ---
  "资产删除后将无法恢复，确认删除吗？": "Once deleted, the asset cannot be recovered. Confirm deletion?",
  "参考图": "Reference image",
  "v3.6版本：": "Version v3.6:",
  "几何表面更整洁，结构更清晰，材质贴图更高质": "Cleaner geometric surfaces, clearer structure, and higher-quality texture maps",
  "几何表面更整洁，结构更清晰，材质贴图更高质量": "Cleaner geometric surfaces, clearer structure, and higher-quality texture maps",
  "单主体人物、正面、全身": "Single character, front view, full body",
  "释放鼠标": "Release the mouse",
  "模型分割": "Model segmentation",
  "预分割": "Pre-segmentation",
  "模型面数不可大于3万": "The model cannot have more than 30,000 faces",
  "支持FBX, GLB, OBJ格式": "Supported formats: FBX, GLB, OBJ",
  "支持.FBX, .GLB, .OBJ格式": "Supported formats: .FBX, .GLB, .OBJ",

  // --- Topology, A-pose and prompt-based creation ---
  "模型已拓扑": "Model already retopologized",
  "低面数：": "Low face count: ",
  "中面数：": "Medium face count: ",
  "高面数：": "High face count: ",
  "v1.5版本-首个原生四边面拓扑模型，布线规整度进一步提升": "Version v1.5: first model with native quad topology and even cleaner edge flow",
  "支持FBX, GLB, OBJ格式，面数小于10万": "Supported formats: FBX, GLB, OBJ. Fewer than 100,000 faces",
  "标准化A-pose（只针对角色）": "Standard A-pose (characters only)",
  "对输入的prompt生成的全身人像转换为标准A-pose姿态（建议输入真人正面站立图像，四肢未遮挡，无附加物品（如手提包、武器装备、篮球、足球），头发不过肩，衣服合身，无宽松长袖、长裙、古装等）": "Converts the full-body figure generated from the prompt to a standard A-pose (a front-facing standing photo of a real person works best: limbs unobstructed, no extra items such as handbags, weapons, basketballs or footballs, hair not past the shoulders, close-fitting clothes, no loose long sleeves, long skirts or period costumes)",
  "请输入提示词": "Enter a prompt",
  "骑士": "Knight",
  "特征（可选）": "Features (optional)",
  "穿戴中世纪铠甲": "Wearing medieval armor",
  "风格（可选）": "Style (optional)",
  "卡通": "Cartoon",
  "仅限人物角色，支持png/jpg/jpeg/webp格式，文件大小最大不超过10M，分辨率最低要求128*128，最高限制4096*4096": "Characters only. Supported formats: png/jpg/jpeg/webp. Maximum size 10 MB, resolution from 128*128 to 4096*4096"
};

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

  // Titolo della scheda: <title> sta nell'head, fuori da document.body
  let titleOrig = null, titleWritten = null;
  function handleTitle() {
    const cur = document.title;
    if (cur === titleWritten || !HAS_HAN.test(cur)) return;
    titleOrig = cur;
    if (lang === "zh") return;
    const apply = s => { titleWritten = s; document.title = s; };
    const tr = translateSync(cur);
    if (tr != null) { apply(tr); return; }
    const l = lang;
    missing.add(cur.trim());
    translateMT(cur.trim(), l).then(r => { if (r && document.title === cur && lang === l) apply(r); });
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

  new MutationObserver(handleTitle).observe(document.head || document.documentElement, { childList: true, subtree: true, characterData: true });

  // Ripristina il cinese originale e dimentica le nostre scritture, così un
  // successivo walk() riparte da zero (anche con un'altra lingua).
  function restoreAll() {
    if (titleOrig != null) { titleWritten = null; document.title = titleOrig; }
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
    if (lang !== "zh") { walk(document.body); handleTitle(); }
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
  handleTitle();
  observe(document.body);
  document.documentElement.lang = lang;
})();
