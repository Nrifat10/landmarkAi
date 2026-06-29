#!/usr/bin/env bash
# Generate construction images one at a time with proper logging
# Runs in background, generates all 62 images
set -u

OUT_DIR="/home/z/my-project/public/images/generated"
mkdir -p "$OUT_DIR"
LOG="/home/z/my-project/scripts/gen-progress.log"

STYLE="realistic documentary photograph, professional, clean, natural lighting, no text, no watermark, no logo, high quality, detailed"

gen() {
  local name="$1"
  local size="$2"
  local prompt="$3"
  local fpath="$OUT_DIR/${name}.png"

  if [ -f "$fpath" ] && [ "$(stat -c%s "$fpath" 2>/dev/null)" -gt 5000 ]; then
    echo "[$(date +%H:%M:%S)] SKIP $name (exists)" >> "$LOG"
    return 0
  fi

  echo "[$(date +%H:%M:%S)] GEN $name ($size)..." >> "$LOG"
  timeout 150 z-ai image -p "${prompt}, ${STYLE}" -o "$fpath" -s "$size" >> "$LOG" 2>&1

  if [ -f "$fpath" ] && [ "$(stat -c%s "$fpath" 2>/dev/null)" -gt 5000 ]; then
    SIZE_KB=$(( $(stat -c%s "$fpath") / 1024 ))
    echo "[$(date +%H:%M:%S)] OK $name (${SIZE_KB}KB)" >> "$LOG"
    return 0
  else
    echo "[$(date +%H:%M:%S)] FAIL $name" >> "$LOG"
    return 1
  fi
}

# Start fresh log
echo "=== IMAGE GENERATION START $(date) ===" > "$LOG"

# WORKERS (6)
gen "workers-1" "1344x768" "Multi-ethnic team of construction workers in white hard hats and orange safety vests collaborating on steel structure at building site, holding tools, active work, daytime"
gen "workers-2" "1344x768" "Construction workers pouring concrete into rebar foundation at building site, wheelbarrows and cement, dust in air, real work in progress"
gen "workers-3" "1344x768" "Group of skilled construction workers in hard hats and vests reviewing blueprints at construction site with crane in background, planning meeting"
gen "workers-4" "768x1344" "Construction worker in safety harness working at height on steel beam, blue sky, industrial building under construction, focused on task"
gen "workers-5" "1344x768" "Construction crew of five workers in hard hats lifting and positioning steel pipes at industrial site, teamwork, pipes stacked nearby"
gen "workers-6" "1344x768" "Construction foreman in white hard hat and orange vest directing crane operation with hand signals at busy construction site"

# EQUIPMENT (7)
gen "equipment-1" "1344x768" "Yellow excavator digging earth at construction site with dust cloud, operator visible in cab, dump truck nearby, active excavation"
gen "equipment-2" "1344x768" "Large mobile crane lifting heavy steel beam at high-rise construction site, blue sky, workers guiding the load, industrial setting"
gen "equipment-3" "1344x768" "Yellow bulldozer pushing earth and leveling ground at construction site, dust trail behind, operator in cab, infrastructure project"
gen "equipment-4" "1344x768" "Forklift carrying pallet of construction materials through warehouse, industrial setting, worker guiding, organized storage"
gen "equipment-5" "768x1344" "Tower crane at construction site against sunset sky, multiple cranes visible, high-rise buildings under construction, golden hour"
gen "equipment-6" "1344x768" "Excavator loading dump truck with gravel at construction site, both machines yellow, earth moving operation, clear day"
gen "equipment-7" "1344x768" "Row of construction equipment including excavator crane and bulldozer parked at industrial yard, organized fleet, daytime"

echo "[$(date +%H:%M:%S)] === BATCH 1 DONE (workers + equipment) ===" >> "$LOG"

# REFINERY (7)
gen "refinery-1" "1344x768" "Oil refinery industrial complex with storage tanks distillation towers and network of pipes at dusk, dramatic sky, large scale facility"
gen "refinery-2" "1344x768" "Petrochemical plant at night with lights illuminating towers and pipes, flare stack, industrial facility, dark sky"
gen "refinery-3" "1344x768" "Oil and gas processing facility with workers in hard hats inspecting valves and pipes, industrial setting, safety equipment, daytime"
gen "refinery-4" "768x1344" "Refinery flare stack with flame against twilight sky, industrial pipes and towers, oil and gas facility, dramatic lighting"
gen "refinery-5" "1344x768" "Industrial oil refinery aerial view showing storage tanks processing units and pipeline network, large facility, daytime"
gen "refinery-6" "1344x768" "Worker in safety gear inspecting pipeline valves at oil refinery, industrial pipes and gauges, focused on task"
gen "refinery-7" "1344x768" "Oil refinery at sunset with silhouettes of towers and pipes, orange and purple sky, industrial landscape, atmospheric"

# WELDING (6)
gen "welding-1" "1344x768" "Industrial welder wearing protective helmet and gloves welding steel pipe, bright sparks flying, dark workshop background, focused work"
gen "welding-2" "1344x768" "Welder working on large steel pipeline at construction site, sparks and light from welding point, protective gear, outdoor industrial setting"
gen "welding-3" "1344x768" "Pipe fitters aligning large steel pipes at industrial construction site, heavy machinery, workers coordinating, pipeline installation"
gen "welding-4" "1344x768" "Steel pipe fabrication workshop with workers welding and assembling pipes, industrial interior, organized workspace, sparks visible"
gen "welding-5" "1024x1024" "Close-up of welder hands working on steel pipe joint with bright welding arc and sparks, protective gloves, detailed work"
gen "welding-6" "1344x768" "Pipeline construction in desert landscape, workers welding large steel pipes in trench, heavy equipment, blue sky, industrial project"

echo "[$(date +%H:%M:%S)] === BATCH 2 DONE (refinery + welding) ===" >> "$LOG"

# INDUSTRIAL (6)
gen "industrial-1" "1344x768" "Modern industrial warehouse interior with tall shelving units, organized storage, forklift, bright lighting, clean facility"
gen "industrial-2" "1344x768" "Factory floor with industrial machinery and workers operating equipment, manufacturing setting, organized production line"
gen "industrial-3" "1344x768" "Construction materials and tools organized at industrial site, stacked pipes steel beams equipment ready for use, daytime"
gen "industrial-4" "1344x768" "Industrial workers in safety gear operating heavy machinery in factory, focused on work, manufacturing environment"
gen "industrial-5" "1344x768" "Storage warehouse with racks of industrial supplies and materials, organized inventory, bright interior, logistics facility"
gen "industrial-6" "1344x768" "Industrial tools and equipment laid out at construction site, power tools safety equipment, organized workspace"

# TRANSPORT (6)
gen "transport-1" "1344x768" "Black luxury SUV corporate vehicle parked at modern building entrance, clean professional automotive, daytime"
gen "transport-2" "1344x768" "Modern white coach bus on highway with mountains in background, staff transportation, professional vehicle, clear day"
gen "transport-3" "1344x768" "White pickup truck parked at construction site with building materials in bed, work vehicle, industrial setting"
gen "transport-4" "1344x768" "Water tanker truck at construction site spraying water, industrial vehicle, dust control, work in progress"
gen "transport-5" "1344x768" "Low bed trailer truck transporting heavy construction equipment on desert highway, industrial transport, blue sky"
gen "transport-6" "1344x768" "Row of white shuttle buses parked at industrial facility parking lot, staff transport fleet, organized, daytime"

echo "[$(date +%H:%M:%S)] === BATCH 3 DONE (industrial + transport) ===" >> "$LOG"

# SAUDI (6)
gen "saudi-1" "1344x768" "Riyadh Saudi Arabia modern skyline with Kingdom Centre Tower and skyscrapers, golden hour, urban development, clear sky"
gen "saudi-2" "1344x768" "Construction site in Saudi Arabia desert with cranes and equipment, infrastructure development, blue sky, arid landscape"
gen "saudi-3" "1344x768" "Modern Riyadh cityscape at dusk with illuminated skyscrapers, urban development, Saudi Arabia, atmospheric"
gen "saudi-4" "1344x768" "Saudi Arabia oil field with pump jacks and drilling rigs in desert, industrial energy production, blue sky, arid"
gen "saudi-5" "1344x768" "Large construction project in Saudi Arabia with multiple tower cranes building skyscrapers, development, daytime"
gen "saudi-6" "1344x768" "Modern Saudi Arabian industrial city with factories and facilities, desert landscape, blue sky, development"

# HERO (6)
gen "hero-1" "1440x720" "Construction site at sunset with multiple cranes silhouetted against orange sky, dramatic atmosphere, industrial development"
gen "hero-2" "1440x720" "Aerial view of large construction site with cranes equipment and workers, multiple buildings under construction, golden hour"
gen "hero-3" "1440x720" "Construction workers silhouettes against dramatic sunset sky with cranes, industrial site, atmospheric, heroic"
gen "hero-4" "1440x720" "Modern construction project with glass skyscraper under construction, crane, blue sky, professional development"
gen "hero-5" "1440x720" "Industrial construction site at dawn with cranes and smoke stacks, atmospheric lighting, large scale project"
gen "hero-6" "1440x720" "Construction site panorama with multiple cranes and structures, sunset sky, industrial development, wide view"

echo "[$(date +%H:%M:%S)] === BATCH 4 DONE (saudi + hero) ===" >> "$LOG"

# ENGINEERS (6)
gen "engineers-1" "1344x768" "Construction engineer in white hard hat reviewing blueprints at building site, professional, clipboard, focused, daytime"
gen "engineers-2" "1344x768" "Two engineers in hard hats inspecting construction plans on tablet at site, modern construction management, professional"
gen "engineers-3" "1344x768" "Construction site manager with safety helmet and vest directing operations, walkie-talkie, industrial background, leadership"
gen "engineers-4" "1344x768" "Engineers in hard hats examining structural plans at construction site, teamwork, blueprints, industrial setting"
gen "engineers-5" "1344x768" "QA/QC inspector in safety gear checking quality at construction site with measuring tools, professional, focused work"
gen "engineers-6" "1344x768" "Construction supervisor team meeting at site with drawings and plans, hard hats, safety vests, professional discussion"

# HOSPITALITY (3)
gen "hospitality-1" "1344x768" "Luxury hotel lobby interior with marble floor, modern reception desk, warm lighting, elegant seating area, professional hospitality"
gen "hospitality-2" "1344x768" "Hotel reception desk with professional staff welcoming guests, modern lobby interior, hospitality service, clean"
gen "hospitality-3" "1344x768" "Elegant hotel restaurant interior with set tables, ambient lighting, professional hospitality setting, refined atmosphere"

# FUEL (3)
gen "fuel-1" "1344x768" "Modern fuel station with canopy at dusk, illuminated pumps, clean facility, professional gas station, evening lighting"
gen "fuel-2" "1024x1024" "Fuel pump nozzle close-up at gas station, clean modern dispenser, professional, no branding, detail shot"
gen "fuel-3" "1344x768" "Modern petrol station at night with bright canopy lights, fuel pumps, convenience store, clean facility, professional"

echo "[$(date +%H:%M:%S)] === ALL DONE ===" >> "$LOG"
echo "Total images: $(ls $OUT_DIR/*.png 2>/dev/null | wc -l)" >> "$LOG"
