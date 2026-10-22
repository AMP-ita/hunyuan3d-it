#!/usr/bin/env bash
# Rilascia un aggiornamento: alza la versione patch in manifest.json,
# rigenera lo userscript, fa commit e push su master.
# Uso: ./release.sh ["messaggio di commit"]
set -euo pipefail
cd "$(dirname "$0")"

PY=python3
command -v "$PY" >/dev/null 2>&1 && "$PY" --version >/dev/null 2>&1 || PY=python

if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "Nessuna modifica da rilasciare." >&2
  exit 1
fi

# alza la patch (1.3.0 -> 1.3.1) senza toccare il resto del manifest
NEW=$("$PY" - <<'EOF'
import re
from pathlib import Path
p = Path("manifest.json")
t = p.read_text(encoding="utf-8")
m = re.search(r'("version"\s*:\s*")(\d+)\.(\d+)\.(\d+)(")', t)
new = f"{m.group(2)}.{m.group(3)}.{int(m.group(4)) + 1}"
p.write_text(t[:m.start()] + m.group(1) + new + m.group(5) + t[m.end():], encoding="utf-8")
print(new)
EOF
)

"$PY" build_userscript.py

git add -A
git commit -m "${1:-Aggiorna dizionario (v$NEW)}"
git push origin master
echo "Rilasciata la versione $NEW"
