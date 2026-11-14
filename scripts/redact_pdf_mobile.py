#!/usr/bin/env python3
"""
Redact the mobile number (+966 55 528 5235) from the company profile PDF.

Two locations identified via pdfplumber:
  - Page 12 (0-idx 11): "... +966 13 358 6853 • Mobile: +966 55 528 5235"
    -> cover only the "• Mobile: +966 55 528 5235" tail on a light-grey row.
  - Page 13 (0-idx 12): footer icon row, "Mobile:" label + number on dark navy.
    -> cover the text only (keep the gold phone icon, telephone line already
       present above).

Background colours sampled from the rendered pages so the redaction blends in.
"""
import io
import shutil
import sys
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas

PDF = Path("/home/z/my-project/public/landmark-company-profile.pdf")
BACKUP = Path("/tmp/landmark-company-profile.backup.pdf")

# Page dims (from pdfplumber)
PAGE12 = (595.92, 841.92)  # width, height in pts
PAGE13 = (595.28, 841.89)

# Redact regions: (x, y_bottom, width, height) in reportlab (bottom-left origin)
# Page 12: mobile text at top=609..620 pts, x 285..406 -> y_bottom = H - 622 = 219.92, h=16
RECT12 = (285, 219.92, 121, 16, (243, 243, 245))  # light grey row fill
# Page 13: mobile text at top=805..836 pts, x 66..162 -> y_bottom = H - 836 = 5.89, h=31
RECT13 = (66, 5.89, 96, 31, (10, 20, 29))  # dark navy footer fill


def make_overlay(page_size, rect):
    x, y, w, h, (r, g, b) = rect
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=page_size)
    c.setFillColorRGB(r / 255, g / 255, b / 255)
    c.rect(x, y, w, h, fill=1, stroke=0)
    c.showPage()
    c.save()
    return PdfReader(io.BytesIO(buf.getvalue())).pages[0]


def main():
    if not PDF.exists():
        sys.exit(f"PDF not found: {PDF}")
    shutil.copy2(PDF, BACKUP)
    print(f"backup -> {BACKUP}")

    ov12 = make_overlay(PAGE12, RECT12)
    ov13 = make_overlay(PAGE13, RECT13)

    reader = PdfReader(str(PDF))
    writer = PdfWriter()
    for i, page in enumerate(reader.pages):
        if i == 11:
            page.merge_page(ov12)
            print(f"page {i+1}: redacted mobile (light-grey row)")
        elif i == 12:
            page.merge_page(ov13)
            print(f"page {i+1}: redacted mobile (navy footer)")
        writer.add_page(page)

    with open(PDF, "wb") as f:
        writer.write(f)
    print(f"wrote {PDF} ({PDF.stat().st_size//1024} KB)")


if __name__ == "__main__":
    main()
