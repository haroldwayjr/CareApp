#!/usr/bin/env python3
"""Emit use_figma JS for a slice of matched Streamline 3.0 icon sets."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path("/Users/harold.wayjr/Projects/CareApp/assets/icons")
META = ROOT / "_streamline_3_0"
PREFIX = (META / "apply-prefix.js").read_text()
PREFIX = PREFIX.split("const BATCH")[0].rstrip() + "\n"


def minify(svg: str) -> str:
    svg = re.sub(r"\s+", " ", svg).strip()
    return svg


def rows() -> list[dict]:
    mp = json.loads((META / "map.json").read_text())
    extra = json.loads((META / "extras.json").read_text())
    by = {}
    for r in mp:
        if r.get("regularHash") and r.get("boldHash") and r.get("figma"):
            by[r["figma"]] = r
    for r in extra:
        if r.get("figma"):
            by[r["figma"]] = r
    out = [by[k] for k in sorted(by)]
    return out


def main() -> None:
    start = int(sys.argv[1])
    count = int(sys.argv[2])
    dest = Path(sys.argv[3]) if len(sys.argv) > 3 else Path("/tmp/apply-batch.js")
    all_rows = rows()
    slice_rows = all_rows[start : start + count]
    items = []
    for r in slice_rows:
        filled = bool(r.get("filledOnOutline"))
        bold_path = ROOT / "streamline-bold" / r["file"]
        if filled:
            outline = minify(bold_path.read_text())
        else:
            outline = minify((ROOT / "streamline" / r["file"]).read_text())
        bold = minify(bold_path.read_text())
        items.append(
            {
                "figma": r["figma"],
                "regularName": r.get("regularName") or r.get("query") or r.get("name"),
                "filledOnOutline": filled,
                "outline": outline,
                "bold": bold,
            }
        )
    batch_json = json.dumps(items)
    js = (
        PREFIX
        + "const BATCH = "
        + batch_json
        + ";\n"
        + """
const sets = page.findAllWithCriteria({ types: ['COMPONENT_SET'] });
const results = [];
for (const item of BATCH) {
  const set = sets.find(s => s.name === item.figma);
  if (!set) { results.push({ figma: item.figma, ok: false, reason: 'missing-set' }); continue; }
  applyOutline(set, item.outline, item.filledOnOutline);
  applyBoldXs(set, item.bold);
  parkSet(set);
  set.description = item.filledOnOutline
    ? ('Streamline Bold 3.0 — ' + item.regularName + ' (intentional fill on outline slots)')
    : ('Streamline Regular 3.0 — ' + item.regularName);
  results.push({ figma: item.figma, ok: true });
}
return { n: results.length, failed: results.filter(r => !r.ok), ok: results.filter(r => r.ok).map(r => r.figma) };
"""
    )
    dest.write_text(js)
    print(start, count, "wrote", dest, "chars", len(js), "icons", len(items))


if __name__ == "__main__":
    main()
