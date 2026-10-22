#!/usr/bin/env python3
"""Genera hunyuan3d-it.user.js (Tampermonkey/Violentmonkey) dai file dell'estensione.

Uso:  python3 build_userscript.py
Prima di pubblicare un aggiornamento alza "version" in manifest.json:
Tampermonkey scarica l'aggiornamento solo se il numero di versione cresce.
"""
import json
from pathlib import Path

GITHUB_USER = "amp-ita"
REPO = "hunyuan3d-it"
BRANCH = "master"

here = Path(__file__).parent
manifest = json.loads((here / "manifest.json").read_text(encoding="utf-8"))
raw = f"https://raw.githubusercontent.com/{GITHUB_USER}/{REPO}/{BRANCH}/hunyuan3d-it.user.js"

header = f"""// ==UserScript==
// @name         {manifest['name']}
// @namespace    https://github.com/{GITHUB_USER}/{REPO}
// @version      {manifest['version']}
// @description  {manifest['description']}
// @author       Marco
// @match        https://3d.hunyuan.tencent.com/*
// @run-at       document-idle
// @grant        none
// @homepageURL  https://github.com/{GITHUB_USER}/{REPO}
// @updateURL    {raw}
// @downloadURL  {raw}
// ==/UserScript==
"""

css = (here / "style.css").read_text(encoding="utf-8").replace("\\", "\\\\").replace("`", "\\`")
style_js = f"""
(() => {{
  const s = document.createElement("style");
  s.id = "hy-it-style";
  s.textContent = `{css}`;
  (document.head || document.documentElement).appendChild(s);
}})();
"""

out = "\n".join([
    header,
    "/* File generato da build_userscript.py: modifica dict.js / content.js / style.css, non questo. */",
    style_js,
    (here / "dict.js").read_text(encoding="utf-8"),
    (here / "content.js").read_text(encoding="utf-8"),
])
(here / "hunyuan3d-it.user.js").write_text(out, encoding="utf-8")
print("OK ->", here / "hunyuan3d-it.user.js", "versione", manifest["version"])
