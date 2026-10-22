# Hunyuan 3D in italiano

Traduce in italiano l'interfaccia di [Hunyuan 3D Studio](https://3d.hunyuan.tencent.com/) (progetto non ufficiale, non affiliato a Tencent).

## Installazione

1. Installa **Tampermonkey** (Chrome, Edge, Firefox, Safari) oppure **Violentmonkey**.
2. **Solo Chrome/Edge:** in `chrome://extensions` → Tampermonkey → *Dettagli* → attiva **"Consenti script utente"** (nelle versioni meno recenti di Chrome: attiva la *Modalità sviluppatore* in alto a destra).
3. Apri questo link e premi **Installa**:
   https://raw.githubusercontent.com/amp-ita/hunyuan3d-it/master/hunyuan3d-it.user.js
4. Ricarica la pagina di Hunyuan 3D.

Gli aggiornamenti arrivano in automatico.

## Uso

- Passa il mouse su un testo tradotto per vedere l'originale cinese.
- **Alt+Shift+O**: mostra/nasconde il testo originale.
- **Alt+Shift+M**: copia negli appunti i testi non ancora presenti nel dizionario.
- Su Chrome i testi non presenti nel dizionario vengono tradotti dal traduttore integrato del browser (il modello si scarica al primo clic sulla pagina). Sugli altri browser restano in cinese finché non vengono aggiunti al dizionario.

## Sviluppo

- Traduzioni: `dict.js` · logica: `content.js` · stile: `style.css`
- Rigenera lo userscript con `python3 build_userscript.py` dopo aver alzato `version` in `manifest.json`.
- La cartella funziona anche come estensione Chrome non pacchettizzata.
