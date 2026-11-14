#!/usr/bin/env python3
"""Add siteOgImage to every section layout's openGraph so og:image is emitted
on all pages (Next.js doesn't inherit parent openGraph.images into a child
layout that defines its own openGraph)."""
import re
from pathlib import Path

FILES = [
    "src/app/aramco-vendor/layout.tsx",
    "src/app/contact/layout.tsx",
    "src/app/about/layout.tsx",
    "src/app/projects/layout.tsx",
    "src/app/services/manpower/layout.tsx",
    "src/app/services/equipment/layout.tsx",
    "src/app/services/transport/layout.tsx",
    "src/app/services/petro/layout.tsx",
    "src/app/services/hospitality/layout.tsx",
    "src/app/services/industrial/layout.tsx",
]

ROOT = Path("/home/z/my-project")
IMPORT_LINE = 'import { siteOgImage } from "@/lib/data";'

for rel in FILES:
    p = ROOT / rel
    txt = p.read_text()
    changes = []

    # 1. Add the import (after the Metadata import) if not present
    if IMPORT_LINE not in txt:
        txt2 = re.sub(
            r'(import type \{ Metadata \} from "next";\n)',
            r'\1' + IMPORT_LINE + '\n',
            txt,
            count=1,
        )
        if txt2 == txt:
            print(f"  ! {rel}: could not insert import")
            continue
        changes.append("import")
        txt = txt2

    # 2. Add images: [siteOgImage], right after the url: line inside openGraph
    #    url line pattern: 4 spaces, url: "....",  (with trailing comma)
    pattern = re.compile(r'(\n    url: "https://www\.landmarkgulf\.com[^"]*",\n)')
    if 'images: [siteOgImage]' not in txt:
        txt2, n = pattern.subn(r'\1    images: [siteOgImage],\n', txt, count=1)
        if n == 0:
            print(f"  ! {rel}: could not find url line to anchor images")
            continue
        changes.append("images")
        txt = txt2

    p.write_text(txt)
    print(f"  ✓ {rel}: {', '.join(changes)}")
