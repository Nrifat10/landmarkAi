#!/usr/bin/env python3
"""
Generate clean, non-stock construction images using AI image generation.
Each prompt is crafted to produce realistic, professional construction
photography that doesn't look like staged stock photos.

Output: /home/z/my-project/public/images/generated/{prefix}-{N}.png
"""
import subprocess
import os
import sys
import time
from pathlib import Path

OUT_DIR = Path("/home/z/my-project/public/images/generated")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Style suffix applied to all prompts for consistency
STYLE = "realistic documentary photograph, professional, clean, natural lighting, no text, no watermark, no logo, high quality, detailed"

# Image definitions: (filename, prompt, size)
# Sizes: 1344x768 (landscape), 1024x1024 (square), 768x1344 (portrait), 1440x720 (wide)
IMAGES = [
    # === WORKERS (6) - landscape 1344x768 ===
    ("workers-1", "Multi-ethnic team of construction workers in white hard hats and orange safety vests collaborating on a steel structure at a large building site, holding tools, natural daylight, active work", "1344x768"),
    ("workers-2", "Construction workers pouring concrete into rebar foundation at building site, wheelbarrows and cement, dust in air, daytime, real work in progress", "1344x768"),
    ("workers-3", "Group of skilled construction workers in hard hats and vests reviewing blueprints together at construction site with crane in background, planning meeting", "1344x768"),
    ("workers-4", "Construction worker in safety harness working at height on steel beam, blue sky background, industrial building under construction, focused on task", "768x1344"),
    ("workers-5", "Construction crew of five workers in hard hats lifting and positioning steel pipes at industrial site, teamwork, pipes stacked nearby", "1344x768"),
    ("workers-6", "Construction foreman in white hard hat and orange vest directing crane operation with hand signals at busy construction site, multiple workers around", "1344x768"),

    # === EQUIPMENT (7) - landscape ===
    ("equipment-1", "Yellow excavator digging earth at construction site with dust cloud, operator visible in cab, dump truck nearby, active excavation work, daytime", "1344x768"),
    ("equipment-2", "Large mobile crane lifting heavy steel beam at high-rise construction site, blue sky, workers guiding the load, industrial setting", "1344x768"),
    ("equipment-3", "Yellow bulldozer pushing earth and leveling ground at construction site, dust trail behind, operator in cab, infrastructure project", "1344x768"),
    ("equipment-4", "Forklift carrying pallet of construction materials through warehouse, industrial setting, worker guiding, organized storage", "1344x768"),
    ("equipment-5", "Tower crane at construction site against sunset sky, multiple cranes visible, high-rise buildings under construction, golden hour", "768x1344"),
    ("equipment-6", "Excavator loading dump truck with gravel at construction site, both machines yellow, earth moving operation, clear day", "1344x768"),
    ("equipment-7", "Row of construction equipment including excavator, crane and bulldozer parked at industrial yard, maintenance area, organized fleet", "1344x768"),

    # === REFINERY (7) - landscape ===
    ("refinery-1", "Oil refinery industrial complex with storage tanks, distillation towers and network of pipes at dusk, dramatic sky, large scale facility", "1344x768"),
    ("refinery-2", "Petrochemical plant at night with lights illuminating towers and pipes, flare stack with small flame, industrial facility, dark sky", "1344x768"),
    ("refinery-3", "Oil and gas processing facility with workers in hard hats inspecting valves and pipes, industrial setting, safety equipment, daytime", "1344x768"),
    ("refinery-4", "Refinery flare stack with flame against twilight sky, industrial pipes and towers, oil and gas facility, dramatic lighting", "768x1344"),
    ("refinery-5", "Industrial oil refinery aerial view showing storage tanks, processing units and pipeline network, large facility, daytime", "1344x768"),
    ("refinery-6", "Worker in safety gear inspecting pipeline valves at oil refinery, industrial pipes and gauges, focused on task, professional", "1344x768"),
    ("refinery-7", "Oil refinery at sunset with silhouettes of towers and pipes, orange and purple sky, industrial landscape, atmospheric", "1344x768"),

    # === WELDING (6) - landscape ===
    ("welding-1", "Industrial welder wearing protective helmet and gloves welding steel pipe, bright sparks flying, dark workshop background, focused work", "1344x768"),
    ("welding-2", "Welder working on large steel pipeline at construction site, sparks and light from welding point, protective gear, outdoor industrial setting", "1344x768"),
    ("welding-3", "Pipe fitters aligning large steel pipes at industrial construction site, heavy machinery, workers coordinating, pipeline installation", "1344x768"),
    ("welding-4", "Steel pipe fabrication workshop with workers welding and assembling pipes, industrial interior, organized workspace, sparks visible", "1344x768"),
    ("welding-5", "Close-up of welder hands working on steel pipe joint with bright welding arc and sparks, protective gloves, detailed work", "1024x1024"),
    ("welding-6", "Pipeline construction in desert landscape, workers welding large steel pipes in trench, heavy equipment, blue sky, industrial project", "1344x768"),

    # === INDUSTRIAL (6) - landscape ===
    ("industrial-1", "Modern industrial warehouse interior with tall shelving units, organized storage, forklift, bright lighting, clean facility", "1344x768"),
    ("industrial-2", "Factory floor with industrial machinery and workers operating equipment, manufacturing setting, organized production line", "1344x768"),
    ("industrial-3", "Construction materials and tools organized at industrial site, stacked pipes, steel beams, equipment ready for use, daytime", "1344x768"),
    ("industrial-4", "Industrial workers in safety gear operating heavy machinery in factory, focused on work, manufacturing environment", "1344x768"),
    ("industrial-5", "Storage warehouse with racks of industrial supplies and materials, organized inventory, bright interior, logistics facility", "1344x768"),
    ("industrial-6", "Industrial tools and equipment laid out at construction site, power tools, safety equipment, organized workspace", "1344x768"),

    # === TRANSPORT (6) - landscape ===
    ("transport-1", "Black luxury SUV corporate vehicle parked at modern building entrance, clean professional automotive, daytime", "1344x768"),
    ("transport-2", "Modern white coach bus on highway with mountains in background, staff transportation, professional vehicle, clear day", "1344x768"),
    ("transport-3", "White pickup truck parked at construction site with building materials in bed, work vehicle, industrial setting", "1344x768"),
    ("transport-4", "Water tanker truck at construction site spraying water, industrial vehicle, dust control, work in progress", "1344x768"),
    ("transport-5", "Low bed trailer truck transporting heavy construction equipment on desert highway, industrial transport, blue sky", "1344x768"),
    ("transport-6", "Row of white shuttle buses parked at industrial facility parking lot, staff transport fleet, organized, daytime", "1344x768"),

    # === SAUDI (6) - landscape ===
    ("saudi-1", "Riyadh Saudi Arabia modern skyline with Kingdom Centre Tower and skyscrapers, golden hour, urban development, clear sky", "1344x768"),
    ("saudi-2", "Construction site in Saudi Arabia desert with cranes and equipment, infrastructure development, blue sky, arid landscape", "1344x768"),
    ("saudi-3", "Modern Riyadh cityscape at dusk with illuminated skyscrapers, urban development, Saudi Arabia, atmospheric", "1344x768"),
    ("saudi-4", "Saudi Arabia oil field with pump jacks and drilling rigs in desert, industrial energy production, blue sky, arid", "1344x768"),
    ("saudi-5", "Large construction project in Saudi Arabia with multiple tower cranes building skyscrapers, development, daytime", "1344x768"),
    ("saudi-6", "Modern Saudi Arabian industrial city with factories and facilities, desert landscape, blue sky, development", "1344x768"),

    # === HERO (6) - wide 1440x720 ===
    ("hero-1", "Construction site at sunset with multiple cranes silhouetted against orange sky, dramatic atmosphere, industrial development", "1440x720"),
    ("hero-2", "Aerial view of large construction site with cranes, equipment and workers, multiple buildings under construction, golden hour", "1440x720"),
    ("hero-3", "Construction workers silhouettes against dramatic sunset sky with cranes, industrial site, atmospheric, heroic", "1440x720"),
    ("hero-4", "Modern construction project with glass skyscraper under construction, crane, blue sky, professional development", "1440x720"),
    ("hero-5", "Industrial construction site at dawn with cranes and smoke stacks, atmospheric lighting, large scale project", "1440x720"),
    ("hero-6", "Construction site panorama with multiple cranes and structures, sunset sky, industrial development, wide view", "1440x720"),

    # === ENGINEERS (6) - landscape ===
    ("engineers-1", "Construction engineer in white hard hat reviewing blueprints at building site, professional, clipboard, focused, daytime", "1344x768"),
    ("engineers-2", "Two engineers in hard hats inspecting construction plans on tablet at site, modern construction management, professional", "1344x768"),
    ("engineers-3", "Construction site manager with safety helmet and vest directing operations, walkie-talkie, industrial background, leadership", "1344x768"),
    ("engineers-4", "Engineers in hard hats examining structural plans at construction site, teamwork, blueprints, industrial setting", "1344x768"),
    ("engineers-5", "QA/QC inspector in safety gear checking quality at construction site with measuring tools, professional, focused work", "1344x768"),
    ("engineers-6", "Construction supervisor team meeting at site with drawings and plans, hard hats, safety vests, professional discussion", "1344x768"),

    # === HOSPITALITY (3) - landscape ===
    ("hospitality-1", "Luxury hotel lobby interior with marble floor, modern reception desk, warm lighting, elegant seating area, professional hospitality", "1344x768"),
    ("hospitality-2", "Hotel reception desk with professional staff welcoming guests, modern lobby interior, hospitality service, clean", "1344x768"),
    ("hospitality-3", "Elegant hotel restaurant interior with set tables, ambient lighting, professional hospitality setting, refined atmosphere", "1344x768"),

    # === FUEL (3) - landscape ===
    ("fuel-1", "Modern fuel station with canopy at dusk, illuminated pumps, clean facility, professional gas station, evening lighting", "1344x768"),
    ("fuel-2", "Fuel pump nozzle close-up at gas station, clean modern dispenser, professional, no branding, detail shot", "1024x1024"),
    ("fuel-3", "Modern petrol station at night with bright canopy lights, fuel pumps, convenience store, clean facility, professional", "1344x768"),
]

def generate_image(name, prompt, size):
    """Generate a single image using z-ai CLI."""
    fpath = OUT_DIR / f"{name}.png"
    if fpath.exists():
        size_kb = fpath.stat().st_size // 1024
        if size_kb > 20:
            print(f"  SKIP {name}.png (exists, {size_kb}KB)")
            return True

    full_prompt = f"{prompt}, {STYLE}"
    cmd = [
        "z-ai", "image",
        "-p", full_prompt,
        "-o", str(fpath),
        "-s", size,
    ]

    print(f"  Generating {name}.png ({size})...")
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
        if result.returncode != 0:
            print(f"    FAILED: {result.stderr[:200]}")
            return False
        if fpath.exists() and fpath.stat().st_size > 5000:
            size_kb = fpath.stat().st_size // 1024
            print(f"    OK ({size_kb}KB)")
            return True
        else:
            print(f"    FAILED: file too small or missing")
            return False
    except subprocess.TimeoutExpired:
        print(f"    TIMEOUT")
        return False
    except Exception as e:
        print(f"    ERROR: {e}")
        return False

def main():
    # Allow filtering by category from command line
    category_filter = sys.argv[1] if len(sys.argv) > 1 else None

    total = 0
    success = 0
    for name, prompt, size in IMAGES:
        if category_filter and not name.startswith(category_filter):
            continue
        total += 1
        if generate_image(name, prompt, size):
            success += 1
        # Small delay to avoid rate limits
        time.sleep(1)

    print(f"\n=== DONE: {success}/{total} images generated ===")
    print(f"Output: {OUT_DIR}")

if __name__ == "__main__":
    main()
