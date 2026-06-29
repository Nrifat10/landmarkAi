#!/usr/bin/env python3
"""Sequential image search with longer per-call timeout."""
import json, subprocess, urllib.request, time, re
from pathlib import Path

OUT = Path("/home/z/my-project/public/images")
OUT.mkdir(parents=True, exist_ok=True)

SEARCHES = [
    ("construction workers wearing hard hats safety vests at industrial site", "workers", 4),
    ("heavy construction equipment excavator crane at industrial site", "equipment", 4),
    ("oil gas refinery petrochemical plant industrial", "refinery", 4),
    ("luxury hotel lobby reception interior hospitality", "hospitality", 3),
    ("modern fuel petrol gas station at night", "fuel", 3),
    ("welder welding steel pipe pipeline industrial", "welding", 3),
    ("corporate shuttle bus fleet parking transport", "transport", 3),
    ("Saudi Arabia Riyadh skyline construction development", "saudi", 3),
    ("industrial warehouse storage tools materials", "industrial", 3),
    ("construction site sunset dramatic golden hour crane", "hero", 3),
    ("business handshake corporate meeting professional", "meeting", 3),
    ("engineers hard hats reviewing blueprints", "engineers", 3),
]

def search(query, count):
    cmd = ["z-ai", "image-search", "-q", query, "--count", str(count), "--gl", "us", "--no-rank"]
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    except subprocess.TimeoutExpired:
        print("    TIMEOUT", flush=True)
        return []
    out = r.stdout
    match = re.search(r'\{[\s\S]*\}', out)
    if not match:
        return []
    try:
        data = json.loads(match.group(0))
    except Exception:
        return []
    return data.get("results", []) if data.get("success") else []

def download(url, fpath):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        if len(data) < 2000:
            return 0
        with open(fpath, "wb") as f:
            f.write(data)
        return len(data)
    except Exception:
        return 0

def main():
    print("=== IMAGE FETCH START ===", flush=True)
    catalog = {}
    total = 0
    for query, prefix, count in SEARCHES:
        print(f"\n[{prefix}] searching...", flush=True)
        results = []
        for attempt in range(2):
            results = search(query, count)
            if results:
                break
            print(f"  retry {attempt+1} in 10s", flush=True)
            time.sleep(10)
        downloaded = []
        for i, r in enumerate(results):
            url = r.get("original_url")
            if not url:
                continue
            ext = ".png" if "png" in url.lower() else ".jpg"
            fname = f"{prefix}-{i+1}{ext}"
            fpath = OUT / fname
            size = download(url, fpath)
            if size > 0:
                downloaded.append({"file": f"/images/{fname}", "size_kb": size // 1024})
                print(f"  OK {fname} ({size//1024}KB)", flush=True)
        catalog[prefix] = downloaded
        total += len(downloaded)
        time.sleep(3)
    with open(OUT / "catalog.json", "w") as f:
        json.dump(catalog, f, indent=2)
    print(f"\n=== DONE: {total} images ===", flush=True)

if __name__ == "__main__":
    main()
