# Hunyuan 3D Translator (EN/IT)

**English** · [Italiano](#italiano)

Translates the interface of [Hunyuan 3D Studio](https://3d.hunyuan.tencent.com/) into English or Italian (unofficial project, not affiliated with Tencent). English is the default language.

## Installation

1. Install **Tampermonkey** (Chrome, Edge, Firefox, Safari) or **Violentmonkey**.
2. **Chrome/Edge only:** in `chrome://extensions` → Tampermonkey → *Details* → turn on **"Allow user scripts"** (on older Chrome versions: turn on *Developer mode* at the top right).
3. Open this link and press **Install**:
   https://raw.githubusercontent.com/amp-ita/hunyuan3d-it/master/hunyuan3d-it.user.js
4. Reload the Hunyuan 3D page.

Updates are picked up automatically.

## Usage

- **Alt+Shift+L**: switch language (English → Italiano → original Chinese). The choice is remembered.
- **Alt+Shift+O**: toggle between the original Chinese text and the last language you used.
- **Alt+Shift+M**: copy to the clipboard the texts that are not in the dictionary yet.
- Hover over a translated text to see the original Chinese.
- On Chrome, texts missing from the dictionary are translated by the browser's built-in translator (the model downloads on your first click on the page). On other browsers they stay in Chinese until they are added to the dictionary.

## Development

- Translations: `dict.js` (Italian) and `dict.en.js` (English), with the same keys · logic: `content.js` · style: `style.css`
- Regenerate the userscript with `python3 build_userscript.py` after bumping `version` in `manifest.json`.
- The folder also works as an unpacked Chrome extension.

---

<a id="italiano"></a>

# Hunyuan 3D in italiano

Traduce in inglese o in italiano l'interfaccia di [Hunyuan 3D Studio](https://3d.hunyuan.tencent.com/) (progetto non ufficiale, non affiliato a Tencent). La lingua predefinita è l'inglese.

## Installazione

1. Installa **Tampermonkey** (Chrome, Edge, Firefox, Safari) oppure **Violentmonkey**.
2. **Solo Chrome/Edge:** in `chrome://extensions` → Tampermonkey → *Dettagli* → attiva **"Consenti script utente"** (nelle versioni meno recenti di Chrome: attiva la *Modalità sviluppatore* in alto a destra).
3. Apri questo link e premi **Installa**:
   https://raw.githubusercontent.com/amp-ita/hunyuan3d-it/master/hunyuan3d-it.user.js
4. Ricarica la pagina di Hunyuan 3D.

Gli aggiornamenti arrivano in automatico.

## Uso

- **Alt+Shift+L**: cambia lingua (English → Italiano → cinese originale). La scelta viene ricordata.
- **Alt+Shift+O**: alterna il testo originale cinese e l'ultima lingua usata.
- **Alt+Shift+M**: copia negli appunti i testi non ancora presenti nel dizionario.
- Passa il mouse su un testo tradotto per vedere l'originale cinese.
- Su Chrome i testi non presenti nel dizionario vengono tradotti dal traduttore integrato del browser (il modello si scarica al primo clic sulla pagina). Sugli altri browser restano in cinese finché non vengono aggiunti al dizionario.

## Sviluppo

- Traduzioni: `dict.js` (italiano) e `dict.en.js` (inglese), con le stesse chiavi · logica: `content.js` · stile: `style.css`
- Rigenera lo userscript con `python3 build_userscript.py` dopo aver alzato `version` in `manifest.json`.
- La cartella funziona anche come estensione Chrome non pacchettizzata.
