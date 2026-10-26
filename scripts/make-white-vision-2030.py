#!/usr/bin/env python3
"""
Create a clean white version of the Saudi Vision 2030 logo for use on dark backgrounds.

The original SVG has:
- A white background rect that fills the viewBox
- Three groups of paths: dark version (st1), white version (st0), and the visible
  gray/colored version (st2 through st11) — this last group is the one we see.

For a dark footer background, we want a clean white version. We:
1. Strip the white background rect
2. Replace all visible path fills (st2 through st11) with white
3. Keep the colored dots of the mosaic star? No — simpler is to make EVERYTHING white
   so the whole logo appears as a single white silhouette, easy to read on dark.
"""
import re
from pathlib import Path

SRC = Path("/home/z/my-project/public/saudi-vision-2030.svg")
DST = Path("/home/z/my-project/public/saudi-vision-2030-white.svg")

text = SRC.read_text(encoding="utf-8")

# 1) Remove the first <rect class="st0" ...> — the white background that fills the viewBox.
# This rect appears as the very first rect inside the <svg> tag, with positive x or no x.
text = re.sub(
    r'<rect\s+class="st0"\s+width="595\.28"\s+height="366\.89"\s*/>',
    '',
    text,
    count=1,
)

# 2) Add an inline style override at the top of the <style> block so all classes
#    render as white instead of their original colors. The classes st0–st11 are
#    defined inside the SVG's own <style> tag — adding "!important" rules at the
#    end of that block wins because they come later in source order.
white_override = """
	/* WHITE OVERRIDE — for use on dark backgrounds */
	.st0,.st1,.st2,.st3,.st4,.st5,.st6,.st7,.st8,.st9,.st10,.st11 { fill: #FFFFFF !important; }
"""
# Insert the override right before the closing </style> tag
text = text.replace("</style>", white_override + "</style>", 1)

# 3) Write the modified SVG
DST.write_text(text, encoding="utf-8")

print(f"Created: {DST}")
print(f"Size: {DST.stat().st_size} bytes")
