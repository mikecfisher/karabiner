#!/bin/bash
# Kanata + Hammerspoon Setup Script
# Idempotent - safe to run multiple times
# Usage: ./setup.sh [--uninstall]

set -euo pipefail

# ============================================================================
# Configuration
# ============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KANATA_BINARY="$SCRIPT_DIR/kanata_cmd"
KANATA_SOURCE_CONFIG="$SCRIPT_DIR/kanata.kbd"
KANATA_CONFIG_DIR="/usr/local/etc/kanata"
KANATA_CONFIG="$KANATA_CONFIG_DIR/kanata.kbd"
KANATA_PORT=5829
PLIST_NAME="com.kanata"
LAUNCH_DAEMON_PATH="/Library/LaunchDaemons/${PLIST_NAME}.plist"
INSTALL_BINARY_PATH="/usr/local/bin/kanata"
HAMMERSPOON_DIR="$HOME/.hammerspoon"
HAMMERSPOON_SOURCE="$SCRIPT_DIR/hammerspoon"

# Track if we need to reload the daemon
NEEDS_RELOAD=false
CHANGES_MADE=false

# ============================================================================
# Output Helpers
# ============================================================================

info()    { echo "  → $1"; }
success() { echo "  ✓ $1"; }
skip()    { echo "  · $1 (already done)"; }
error()   { echo "  ✗ $1" >&2; }
header()  { echo -e "\n$1"; }

# ============================================================================
# Prerequisite Checks
# ============================================================================

check_macos() {
    if [[ "$(uname)" != "Darwin" ]]; then
        error "This script only runs on macOS"
        exit 1
    fi
}

check_not_root() {
    if [[ "$EUID" -eq 0 ]]; then
        error "Do not run this script as root. It will ask for sudo when needed."
        exit 1
    fi
}

check_xcode_cli() {
    if ! xcode-select -p &>/dev/null; then
        error "Xcode Command Line Tools not installed"
        info "Install with: xcode-select --install"
        exit 1
    fi
}

check_karabiner_driver() {
    local driver_path="/Library/Application Support/org.pqrs/Karabiner-DriverKit-VirtualHIDDevice"
    if [[ ! -d "$driver_path" ]]; then
        error "Karabiner VirtualHIDDevice driver not found"
        echo ""
        echo "  The driver is required for kanata to work."
        echo "  Install Karabiner-Elements from: https://karabiner-elements.pqrs.org/"
        echo "  (You can quit Karabiner-Elements after installation - only the driver is needed)"
        echo ""
        exit 1
    fi
}

check_kanata_binary() {
    if [[ ! -f "$KANATA_BINARY" ]]; then
        error "Kanata binary not found at: $KANATA_BINARY"
        echo ""
        echo "  Download kanata_cmd from GitHub releases:"
        echo "  https://github.com/jtroo/kanata/releases"
        echo ""
        echo "  Make sure to download the version with 'cmd' feature"
        echo "  (e.g., kanata_macos_arm64_cmd.tar.gz)"
        echo ""
        exit 1
    fi

    if [[ ! -x "$KANATA_BINARY" ]]; then
        info "Making kanata binary executable"
        chmod +x "$KANATA_BINARY"
    fi
}

check_kanata_config() {
    if [[ ! -f "$KANATA_SOURCE_CONFIG" ]]; then
        error "Kanata source config not found at: $KANATA_SOURCE_CONFIG"
        exit 1
    fi
}

# ============================================================================
# Homebrew Installation
# ============================================================================

check_homebrew() {
    if ! command -v brew &>/dev/null; then
        error "Homebrew is not installed"
        echo ""
        echo "  Install Homebrew first:"
        echo '  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
        echo ""
        exit 1
    fi
}

# ============================================================================
# Dependency Installation
# ============================================================================

install_hammerspoon() {
    header "Hammerspoon"

    # Check if already installed via brew or if app exists
    if brew list --cask hammerspoon &>/dev/null; then
        skip "Hammerspoon installed via Homebrew"
        return
    fi

    if [[ -d "/Applications/Hammerspoon.app" ]]; then
        skip "Hammerspoon.app exists in /Applications"
        return
    fi

    info "Installing Hammerspoon via Homebrew"
    brew install --cask hammerspoon
    success "Hammerspoon installed"
    CHANGES_MADE=true
}

install_terminal_notifier() {
    header "terminal-notifier"

    if command -v terminal-notifier &>/dev/null; then
        skip "terminal-notifier already installed"
        return
    fi

    info "Installing terminal-notifier via Homebrew"
    brew install terminal-notifier
    success "terminal-notifier installed"
    CHANGES_MADE=true
}

# ============================================================================
# Kanata Binary Installation
# ============================================================================

install_kanata_binary() {
    header "Kanata Binary"

    # Check if binary exists and is the same
    if [[ -f "$INSTALL_BINARY_PATH" ]]; then
        if cmp -s "$KANATA_BINARY" "$INSTALL_BINARY_PATH"; then
            skip "Binary at $INSTALL_BINARY_PATH is up to date"
            return
        fi
        info "Binary differs, updating..."
    else
        info "Installing binary to $INSTALL_BINARY_PATH"
    fi

    sudo mkdir -p "$(dirname "$INSTALL_BINARY_PATH")"
    sudo cp "$KANATA_BINARY" "$INSTALL_BINARY_PATH"
    sudo chmod +x "$INSTALL_BINARY_PATH"
    success "Binary installed to $INSTALL_BINARY_PATH"
    CHANGES_MADE=true
    NEEDS_RELOAD=true
}

# ============================================================================
# Kanata Runtime Config Installation
# ============================================================================

runtime_config_up_to_date() {
    local src dst src_base dst_base found
    local source_files=("$SCRIPT_DIR"/*.kbd)

    if [[ ! -d "$KANATA_CONFIG_DIR" ]]; then
        return 1
    fi

    for src in "${source_files[@]}"; do
        dst="$KANATA_CONFIG_DIR/$(basename "$src")"
        if [[ ! -f "$dst" ]] || ! cmp -s "$src" "$dst"; then
            return 1
        fi
    done

    for dst in "$KANATA_CONFIG_DIR"/*.kbd; do
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
        if [[ "$found" == "false" ]]; then
            return 1
        fi
    done

    return 0
}

install_kanata_config() {
    header "Kanata Runtime Config"

    info "Validating source config"
    "$KANATA_BINARY" --check --cfg "$KANATA_SOURCE_CONFIG" >/dev/null
    success "Source config is valid"

    if runtime_config_up_to_date; then
        skip "Runtime config at $KANATA_CONFIG_DIR is up to date"
    else
        info "Syncing .kbd files to $KANATA_CONFIG_DIR"
        sudo mkdir -p "$KANATA_CONFIG_DIR"
        sudo rm -f "$KANATA_CONFIG_DIR"/*.kbd
        sudo cp "$SCRIPT_DIR"/*.kbd "$KANATA_CONFIG_DIR"/
        sudo chown root:wheel "$KANATA_CONFIG_DIR" "$KANATA_CONFIG_DIR"/*.kbd
        sudo chmod 755 "$KANATA_CONFIG_DIR"
        sudo chmod 644 "$KANATA_CONFIG_DIR"/*.kbd
        success "Runtime config synced to $KANATA_CONFIG_DIR"
        CHANGES_MADE=true
        NEEDS_RELOAD=true
    fi

    info "Validating runtime config"
    "$INSTALL_BINARY_PATH" --check --cfg "$KANATA_CONFIG" >/dev/null
    success "Runtime config is valid"
}

# ============================================================================
# LaunchDaemon Plist Generation & Installation
# ============================================================================

generate_plist() {
    cat <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>${PLIST_NAME}</string>
    <key>ProgramArguments</key>
    <array>
        <string>${INSTALL_BINARY_PATH}</string>
        <string>-c</string>
        <string>${KANATA_CONFIG}</string>
        <string>-n</string>
        <string>-p</string>
        <string>${KANATA_PORT}</string>
        <string>--no-wait</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardErrorPath</key>
    <string>/var/log/kanata.error.log</string>
</dict>
</plist>
EOF
}

install_launch_daemon() {
    header "LaunchDaemon"

    local temp_plist
    temp_plist=$(mktemp)
    generate_plist > "$temp_plist"

    if [[ -f "$LAUNCH_DAEMON_PATH" ]]; then
        if cmp -s "$temp_plist" "$LAUNCH_DAEMON_PATH"; then
            skip "Plist at $LAUNCH_DAEMON_PATH is up to date"
            rm "$temp_plist"
            return
        fi
        info "Plist differs, updating..."
    else
        info "Installing plist to $LAUNCH_DAEMON_PATH"
    fi

    sudo cp "$temp_plist" "$LAUNCH_DAEMON_PATH"
    sudo chown root:wheel "$LAUNCH_DAEMON_PATH"
    sudo chmod 644 "$LAUNCH_DAEMON_PATH"
    rm "$temp_plist"

    success "Plist installed to $LAUNCH_DAEMON_PATH"
    CHANGES_MADE=true
    NEEDS_RELOAD=true
}

# ============================================================================
# Hammerspoon Configuration
# ============================================================================

setup_hammerspoon_symlink() {
    header "Hammerspoon Configuration"

    # Check if source exists
    if [[ ! -d "$HAMMERSPOON_SOURCE" ]]; then
        error "Hammerspoon source directory not found: $HAMMERSPOON_SOURCE"
        return 1
    fi

    # Check if symlink already points to correct location
    if [[ -L "$HAMMERSPOON_DIR" ]]; then
        local current_target
        current_target=$(readlink "$HAMMERSPOON_DIR")
        if [[ "$current_target" == "$HAMMERSPOON_SOURCE" ]]; then
            skip "Symlink $HAMMERSPOON_DIR → $HAMMERSPOON_SOURCE"
            return
        fi
        info "Symlink exists but points to $current_target, updating..."
    elif [[ -d "$HAMMERSPOON_DIR" ]]; then
        info "Backing up existing $HAMMERSPOON_DIR to ${HAMMERSPOON_DIR}.backup"
        mv "$HAMMERSPOON_DIR" "${HAMMERSPOON_DIR}.backup.$(date +%Y%m%d%H%M%S)"
    fi

    ln -sfn "$HAMMERSPOON_SOURCE" "$HAMMERSPOON_DIR"
    success "Symlink created: $HAMMERSPOON_DIR → $HAMMERSPOON_SOURCE"
    CHANGES_MADE=true
}

# ============================================================================
# Service Management
# ============================================================================

is_service_running() {
    sudo launchctl print "system/${PLIST_NAME}" &>/dev/null
}

stop_karabiner_elements() {
    # Keep the Karabiner VirtualHIDDevice daemon running; stop only the
    # Karabiner-Elements services that grab physical keyboards exclusively.
    local uid
    local stopped=false
    uid=$(id -u)

    local gui_labels=(
        "org.pqrs.service.agent.Karabiner-Menu"
        "org.pqrs.service.agent.Karabiner-NotificationWindow"
        "org.pqrs.service.agent.Karabiner-Core-Service-rev2"
        "org.pqrs.service.agent.karabiner_console_user_server"
        "org.pqrs.service.agent.karabiner_session_monitor"
    )
    local system_labels=(
        "org.pqrs.service.daemon.Karabiner-Core-Service"
    )

    for label in "${gui_labels[@]}"; do
        if launchctl print "gui/${uid}/${label}" &>/dev/null 2>&1; then
            if [[ "$stopped" == "false" ]]; then
                info "Stopping Karabiner-Elements (cannot run simultaneously with kanata)"
            fi
            launchctl bootout "gui/${uid}/${label}" 2>/dev/null || true
            stopped=true
        fi
    done

    for label in "${system_labels[@]}"; do
        if launchctl print "system/${label}" &>/dev/null 2>&1; then
            if [[ "$stopped" == "false" ]]; then
                info "Stopping Karabiner-Elements (cannot run simultaneously with kanata)"
            fi
            sudo launchctl bootout "system/${label}" 2>/dev/null || true
            stopped=true
        fi
    done

    if [[ "$stopped" == "true" ]]; then
        success "Karabiner-Elements stopped; VirtualHIDDevice daemon left running"
    fi
}

start_kanata_service() {
    header "Kanata Service"

    stop_karabiner_elements

    if [[ "$NEEDS_RELOAD" == "true" ]]; then
        if is_service_running; then
            info "Stopping existing service for reload"
            sudo launchctl bootout "system/${PLIST_NAME}" 2>/dev/null || true
            sleep 1
        fi

        info "Starting kanata service"
        sudo launchctl bootstrap system "$LAUNCH_DAEMON_PATH"
        success "Kanata service started"
        CHANGES_MADE=true
    elif is_service_running; then
        skip "Kanata service already running"
    else
        info "Starting kanata service"
        sudo launchctl bootstrap system "$LAUNCH_DAEMON_PATH"
        success "Kanata service started"
        CHANGES_MADE=true
    fi
}

# ============================================================================
# Permissions Guide
# ============================================================================

print_permissions_guide() {
    header "Manual Steps Required"
    echo ""
    echo "  The following permissions must be granted manually in System Settings:"
    echo ""
    echo "  1. Input Monitoring (required for kanata to capture keystrokes)"
    echo "     → System Settings → Privacy & Security → Input Monitoring"
    echo "     → Add: $INSTALL_BINARY_PATH"
    echo "     → Remove stale entries for old repo paths if they exist"
    echo ""
    echo "  2. Accessibility (required for Hammerspoon overlays)"
    echo "     → System Settings → Privacy & Security → Accessibility"
    echo "     → Add: Hammerspoon.app"
    echo ""
    echo "  3. Start Hammerspoon"
    echo "     → Open Hammerspoon from Applications"
    echo "     → Click 'Open Preferences' if prompted"
    echo "     → Hammerspoon will connect to kanata automatically"
    echo ""
}

# ============================================================================
# Verification
# ============================================================================

verify_setup() {
    header "Verification"

    local all_ok=true

    # Check runtime config
    if [[ -f "$KANATA_CONFIG" ]] && "$INSTALL_BINARY_PATH" --check --cfg "$KANATA_CONFIG" >/dev/null; then
        success "Runtime config is valid at $KANATA_CONFIG"
    else
        error "Runtime config is missing or invalid at $KANATA_CONFIG"
        all_ok=false
    fi

    # Check daemon
    if is_service_running; then
        success "Kanata daemon is running"
    else
        error "Kanata daemon is NOT running"
        all_ok=false
    fi

    # Check TCP port (give it a moment to start)
    sleep 1
    if nc -z 127.0.0.1 "$KANATA_PORT" 2>/dev/null; then
        success "TCP server responding on port $KANATA_PORT"
    else
        error "TCP server NOT responding on port $KANATA_PORT"
        info "Check logs: tail -f /var/log/kanata.error.log"
        all_ok=false
    fi

    # Check Hammerspoon symlink
    if [[ -L "$HAMMERSPOON_DIR" ]] && [[ "$(readlink "$HAMMERSPOON_DIR")" == "$HAMMERSPOON_SOURCE" ]]; then
        success "Hammerspoon symlink configured"
    else
        error "Hammerspoon symlink not configured correctly"
        all_ok=false
    fi

    if [[ "$all_ok" == "true" ]]; then
        echo ""
        success "All checks passed!"
    fi
}

# ============================================================================
# Uninstall
# ============================================================================

uninstall() {
    echo "=== Kanata Uninstall ==="

    header "Stopping Service"
    if is_service_running; then
        info "Stopping kanata service"
        sudo launchctl bootout "system/${PLIST_NAME}" 2>/dev/null || true
        success "Service stopped"
    else
        skip "Service not running"
    fi

    header "Removing LaunchDaemon"
    if [[ -f "$LAUNCH_DAEMON_PATH" ]]; then
        info "Removing $LAUNCH_DAEMON_PATH"
        sudo rm "$LAUNCH_DAEMON_PATH"
        success "Plist removed"
    else
        skip "Plist not found"
    fi

    header "Removing Runtime Config"
    if [[ -d "$KANATA_CONFIG_DIR" ]]; then
        info "Removing $KANATA_CONFIG_DIR"
        sudo rm -rf "$KANATA_CONFIG_DIR"
        success "Runtime config removed"
    else
        skip "Runtime config not found at $KANATA_CONFIG_DIR"
    fi

    header "Removing Binary"
    if [[ -f "$INSTALL_BINARY_PATH" ]]; then
        info "Removing $INSTALL_BINARY_PATH"
        sudo rm "$INSTALL_BINARY_PATH"
        success "Binary removed"
    else
        skip "Binary not found at $INSTALL_BINARY_PATH"
    fi

    header "Hammerspoon Symlink"
    if [[ -L "$HAMMERSPOON_DIR" ]]; then
        local target
        target=$(readlink "$HAMMERSPOON_DIR")
        if [[ "$target" == "$HAMMERSPOON_SOURCE" ]]; then
            read -p "  Remove Hammerspoon symlink? [y/N] " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                rm "$HAMMERSPOON_DIR"
                success "Symlink removed"
            else
                skip "Symlink kept"
            fi
        else
            skip "Symlink points elsewhere ($target)"
        fi
    else
        skip "No symlink found"
    fi

    echo ""
    success "Uninstall complete"
    echo ""
    echo "  Note: Homebrew packages (hammerspoon, terminal-notifier) were not removed."
    echo "  To remove them: brew uninstall --cask hammerspoon && brew uninstall terminal-notifier"
    echo ""
}

# ============================================================================
# Main
# ============================================================================

main() {
    echo "=== Kanata + Hammerspoon Setup ==="

    # Prerequisites
    header "Checking Prerequisites"
    check_macos
    success "Running on macOS"

    check_not_root
    success "Not running as root"

    check_xcode_cli
    success "Xcode CLI tools installed"

    check_homebrew
    success "Homebrew installed"

    check_karabiner_driver
    success "Karabiner driver installed"

    check_kanata_binary
    success "Kanata binary found"

    check_kanata_config
    success "Kanata source config found"

    # Install dependencies
    install_hammerspoon
    install_terminal_notifier

    # Install kanata
    install_kanata_binary
    install_kanata_config
    install_launch_daemon

    # Setup Hammerspoon
    setup_hammerspoon_symlink

    # Start service
    start_kanata_service

    # Verify
    verify_setup

    # Summary
    if [[ "$CHANGES_MADE" == "true" ]]; then
        print_permissions_guide
    else
        echo ""
        skip "No changes were needed - everything is already configured"
        echo ""
    fi

    echo "  Test the setup:"
    echo "    1. Press . + / together to activate leader layer"
    echo "    2. You should see a Hammerspoon overlay"
    echo "    3. Press 'a' for apps, 'w' for windows, etc."
    echo ""
}

# Handle arguments
case "${1:-}" in
    --uninstall|-u)
        uninstall
        ;;
    --help|-h)
        echo "Usage: $0 [--uninstall]"
        echo ""
        echo "Options:"
        echo "  --uninstall, -u   Remove kanata service and configuration"
        echo "  --help, -h        Show this help message"
        echo ""
        ;;
    "")
        main
        ;;
    *)
        error "Unknown option: $1"
        echo "Run '$0 --help' for usage"
        exit 1
        ;;
esac
