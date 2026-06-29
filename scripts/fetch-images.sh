#!/usr/bin/env bash
# Faster batch image fetch — searches sequentially, downloads in parallel where possible
set -u
OUT_DIR="/home/z/my-project/public/images"
mkdir -p "$OUT_DIR"

# (prefix, query, count)
SEARCHES=(
  "workers|construction workers wearing hard hats safety vests at industrial site|4"
  "equipment|heavy construction equipment excavator crane at industrial site|4"
  "refinery|oil gas refinery petrochemical plant industrial complex|4"
  "hospitality|luxury hotel lobby reception interior hospitality|3"
  "fuel|modern fuel petrol gas station at night|3"
  "welding|welder welding steel pipe pipeline industrial|3"
  "transport|corporate shuttle bus fleet parking transport|3"
  "saudi|Saudi Arabia Riyadh skyline construction development|3"
  "industrial|industrial warehouse storage tools materials|3"
  "hero|construction site sunset dramatic golden hour crane|3"
  "engineers|engineers in hard hats reviewing blueprints|3"
)

CATALOG="$OUT_DIR/catalog.json"
echo '{' > "$CATALOG"
FIRST=1

for entry in "${SEARCHES[@]}"; do
  IFS='|' read -r prefix query count <<< "$entry"
  echo "[$prefix] searching..."

  # Try search with retry
  URLS=""
  for attempt in 1 2 3; do
    URLS=$(timeout 180 z-ai image-search -q "$query" --count "$count" --gl us --no-rank 2>/dev/null | python3 -c "
import sys, json, re
text = sys.stdin.read()
m = re.search(r'\{[\s\S]*\}', text)
if m:
    try:
        data = json.loads(m.group(0))
        for r in data.get('results', []):
            print(r.get('original_url', ''))
    except Exception:
        pass
" 2>/dev/null)
    if [ -n "$URLS" ]; then
      break
    fi
    echo "  retry $attempt in 10s..."
    sleep 10
  done

  if [ -z "$URLS" ]; then
    echo "  FAILED — skipping"
    if [ $FIRST -eq 0 ]; then echo ',' >> "$CATALOG"; fi
    FIRST=0
    printf '"%s": []' "$prefix" >> "$CATALOG"
    continue
  fi

  if [ $FIRST -eq 0 ]; then echo ',' >> "$CATALOG"; fi
  FIRST=0
  printf '"%s": [' "$prefix" >> "$CATALOG"

  i=1
  FIRST_IMG=1
  while IFS= read -r url; do
    [ -z "$url" ] && continue
    ext="jpg"
    case "$url" in *.png) ext="png";; esac
    fname="${prefix}-${i}.${ext}"
    fpath="$OUT_DIR/$fname"
    if curl -sS -L -A "Mozilla/5.0" --max-time 30 -o "$fpath" "$url" && [ -s "$fpath" ]; then
      SIZE=$(stat -c%s "$fpath" 2>/dev/null || echo 0)
      if [ "$SIZE" -gt 2000 ]; then
        [ $FIRST_IMG -eq 0 ] && echo ',' >> "$CATALOG"
        FIRST_IMG=0
        printf '{"file": "/images/%s", "size_kb": %d}' "$fname" $((SIZE / 1024)) >> "$CATALOG"
        echo "  OK $fname ($((SIZE / 1024))KB)"
        i=$((i + 1))
      else
        rm -f "$fpath"
      fi
    fi
  done <<< "$URLS"

  echo ']' >> "$CATALOG"
  sleep 2
done

echo '}' >> "$CATALOG"
echo ""
echo "=== DONE ==="
ls -1 "$OUT_DIR" | grep -v catalog | wc -l
echo "images downloaded"