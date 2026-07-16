#!/bin/bash
# Sync runtime config and restart kanata LaunchDaemon
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLIST="/Library/LaunchDaemons/com.kanata.plist"
CONFIG_DIR="/usr/local/etc/kanata"
SOURCE_CONFIG="$SCRIPT_DIR/kanata.kbd"
RUNTIME_CONFIG="$CONFIG_DIR/kanata.kbd"
KANATA_BIN="${KANATA_BIN:-/usr/local/bin/kanata}"

if [[ ! -x "$KANATA_BIN" ]]; then
  KANATA_BIN="$SCRIPT_DIR/kanata_cmd"
fi

configs_up_to_date() {
  local src dst src_base dst_base found
  local source_files=("$SCRIPT_DIR"/*.kbd)

  [[ -d "$CONFIG_DIR" ]] || return 1

  for src in "${source_files[@]}"; do
    dst="$CONFIG_DIR/$(basename "$src")"
    [[ -f "$dst" ]] && cmp -s "$src" "$dst" || return 1
  done

  for dst in "$CONFIG_DIR"/*.kbd; do
    [[ -e "$dst" ]] || continue
    dst_base=$(basename "$dst")
    found=false
    for src in "${source_files[@]}"; do
      src_base=$(basename "$src")
      if [[ "$src_base" == "$dst_base" ]]; then
        found=true
        break
      fi
    done
    [[ "$found" == "true" ]] || return 1
  done

  return 0
}

echo "Validating source config..."
"$KANATA_BIN" --check --cfg "$SOURCE_CONFIG" >/dev/null

if configs_up_to_date; then
  echo "Runtime config already up to date."
else
  echo "Syncing .kbd files to $CONFIG_DIR..."
  sudo mkdir -p "$CONFIG_DIR"
  sudo rm -f "$CONFIG_DIR"/*.kbd
  sudo cp "$SCRIPT_DIR"/*.kbd "$CONFIG_DIR"/
  sudo chown root:wheel "$CONFIG_DIR" "$CONFIG_DIR"/*.kbd
  sudo chmod 755 "$CONFIG_DIR"
  sudo chmod 644 "$CONFIG_DIR"/*.kbd
fi

echo "Validating runtime config..."
"$KANATA_BIN" --check --cfg "$RUNTIME_CONFIG" >/dev/null

echo "Stopping kanata..."
sudo launchctl bootout system/com.kanata 2>/dev/null || true
sleep 0.5

echo "Starting kanata..."
sudo launchctl bootstrap system "$PLIST"

sleep 1
if sudo launchctl print system/com.kanata &>/dev/null; then
    echo "Kanata restarted successfully."
else
    echo "Failed to start kanata. Check: tail -f /var/log/kanata.error.log"
    exit 1
fi
