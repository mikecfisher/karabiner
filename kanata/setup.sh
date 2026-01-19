#!/bin/bash
# Kanata Setup Script
# Run this script with: sudo ./setup.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KANATA_BINARY="$SCRIPT_DIR/kanata_cmd"
KANATA_CONFIG="$SCRIPT_DIR/kanata.kbd"
LAUNCHD_PLIST="$SCRIPT_DIR/com.kanata.plist"

echo "=== Kanata Setup Script ==="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Error: Please run as root (sudo ./setup.sh)"
    exit 1
fi

# Check if kanata binary exists
if [ ! -f "$KANATA_BINARY" ]; then
    echo "Error: kanata_cmd binary not found at $KANATA_BINARY"
    exit 1
fi

# Step 1: Install binary
echo "Step 1: Installing kanata binary to /usr/local/bin/kanata..."
cp "$KANATA_BINARY" /usr/local/bin/kanata
chmod +x /usr/local/bin/kanata
echo "  Done."

# Step 2: Check Karabiner driver
echo ""
echo "Step 2: Checking Karabiner VirtualHIDDevice driver..."
if [ -d "/Library/Application Support/org.pqrs/Karabiner-DriverKit-VirtualHIDDevice" ]; then
    echo "  Driver directory found."
else
    echo "  WARNING: Karabiner driver not found!"
    echo "  Install from: https://github.com/pqrs-org/Karabiner-DriverKit-VirtualHIDDevice"
    echo "  Continuing anyway..."
fi

# Step 3: Install launchd plist
echo ""
echo "Step 3: Installing launchd plist..."
cp "$LAUNCHD_PLIST" /Library/LaunchDaemons/com.kanata.plist
chown root:wheel /Library/LaunchDaemons/com.kanata.plist
chmod 644 /Library/LaunchDaemons/com.kanata.plist
echo "  Done."

echo ""
echo "=== Setup Complete ==="
echo ""
echo "IMPORTANT: Before starting kanata, you must:"
echo ""
echo "1. STOP Karabiner-Elements (they cannot run simultaneously):"
echo "   - Quit from menu bar, or:"
echo "   launchctl bootout gui/\$(id -u) /Library/LaunchAgents/org.pqrs.karabiner.karabiner_console_user_server.plist"
echo ""
echo "2. Ensure Karabiner driver daemon is running:"
echo "   sudo /Applications/.Karabiner-VirtualHIDDevice-Manager.app/Contents/MacOS/Karabiner-VirtualHIDDevice-Manager activate"
echo "   sudo '/Library/Application Support/org.pqrs/Karabiner-DriverKit-VirtualHIDDevice/Applications/Karabiner-VirtualHIDDevice-Daemon.app/Contents/MacOS/Karabiner-VirtualHIDDevice-Daemon'"
echo ""
echo "3. Add kanata to Input Monitoring in System Settings -> Privacy & Security"
echo ""
echo "4. Test manually first:"
echo "   sudo /usr/local/bin/kanata --cfg '$KANATA_CONFIG'"
echo ""
echo "5. Once working, start the launchd service:"
echo "   sudo launchctl bootstrap system /Library/LaunchDaemons/com.kanata.plist"
echo ""
echo "To stop the service:"
echo "   sudo launchctl bootout system /Library/LaunchDaemons/com.kanata.plist"
