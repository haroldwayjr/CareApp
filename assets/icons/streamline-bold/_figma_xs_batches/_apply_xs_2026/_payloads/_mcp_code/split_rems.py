#!/usr/bin/env python3
import re
from pathlib import Path

base = Path(__file__).parent / "halves_04_10_remainder"
out = Path(__file__).parent / "halves_04_10_rem_halves"
out.mkdir(parents=True, exist_ok=True)

for k in ["1_0", "1_1", "1_2", "1_3", "1_4"]:
    text = (base / f"04_c04_{k}_rem.js").read_text()
    chunks = re.findall(r's\+="([^"]*)"', text)
    key = f"c04_{k}"
    expected = 4000
    full = "".join(chunks)
    mid = len(full) // 2
    for i, part in enumerate([full[:mid], full[mid:]]):
        code = (
            f'let s=figma.root.getSharedPluginData("careapp","{key}")||"";\n'
            f's+="{part}";\n'
            f'figma.root.setSharedPluginData("careapp","{key}",s);\n'
            f'return {{key:"{key}", len:s.length, done:s.length==={expected}, expected:{expected}, part:{i}}};'
        )
        p = out / f"04_{key}_r{i}.js"
        p.write_text(code)
        print(p.name, len(code))
