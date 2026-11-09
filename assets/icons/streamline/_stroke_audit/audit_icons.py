#!/usr/bin/env python3
"""Compare local Streamline Regular SVGs to a Figma vector-count export.

Usage:
  1. Export Figma md drawable counts as JSON object { "icon/...": N }
     (or array of [name, count] pairs) to figma_counts.json beside this script
  2. python3 audit_icons.py

Flags icons where Figma drawable count < SVG path count (possible missing edges).
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(__file__).resolve().parent


def set_name(p: Path) -> str:
    return f"icon/{p.parent.name}/{p.stem.replace('-', '.')}"


def count_paths(svg: str) -> int:
    return len(re.findall(r"<(path|line|polyline|polygon|circle|ellipse|rect)\b", svg, re.I))


def main() -> None:
    svgs = sorted(
        p
        for p in ROOT.rglob("*.svg")
        if not any(part.startswith("_") for part in p.relative_to(ROOT).parts)
    )
    svg_counts = {}
    for p in svgs:
        svg_counts[set_name(p)] = {
            "rel": str(p.relative_to(ROOT)),
            "paths": count_paths(p.read_text()),
        }

    fig_path = OUT / "figma_counts.json"
    if not fig_path.exists():
        raise SystemExit(f"Missing {fig_path}")
    raw = json.loads(fig_path.read_text())
    figma = {k: v for k, v in raw} if isinstance(raw, list) else raw

    missing = []
    matched = 0
    for name, meta in svg_counts.items():
        fv = figma.get(name)
        if fv is None:
            continue
        if fv == meta["paths"]:
            matched += 1
        elif fv < meta["paths"]:
            missing.append(
                {
                    "name": name,
                    "figma": fv,
                    "svg": meta["paths"],
                    "delta": meta["paths"] - fv,
                }
            )

    missing.sort(key=lambda r: -r["delta"])
    report = {
        "svgIcons": len(svg_counts),
        "figmaIcons": len(figma),
        "matched": matched,
        "missingEdges": missing,
    }
    (OUT / "audit_report.json").write_text(json.dumps(report, indent=2))
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
