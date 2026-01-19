# Kanata Config

Keyboard remapping configuration migrated from Karabiner-Elements to [Kanata](https://github.com/jtroo/kanata).

## Features

- **Caps Lock**: Tap for Escape, Hold for Control
- **Leader Key**: Press `.` and `/` together to activate app launching sequences
  - `Leader → a → s` opens Slack
  - `Leader → a → f` opens Finder
  - `Leader → a → t` opens Ghostty
  - etc.

## Files

- `kanata.kbd` - Main configuration file
- `kanata_cmd` - Binary with `cmd` feature enabled (required for app launching)
- `com.kanata.plist` - launchd service file
- `setup.sh` - Installation script

## Quick Setup

```bash
# Run the setup script (requires sudo)
cd kanata
sudo ./setup.sh
```

## Manual Setup

### 1. Install the binary

```bash
sudo cp kanata_cmd /usr/local/bin/kanata
sudo chmod +x /usr/local/bin/kanata
```

### 2. Stop Karabiner-Elements

Kanata and Karabiner cannot run simultaneously - they share the same driver.

```bash
# Quit from menu bar, or:
launchctl bootout gui/$(id -u) /Library/LaunchAgents/org.pqrs.karabiner.karabiner_console_user_server.plist
```

### 3. Ensure Karabiner driver is active

```bash
sudo /Applications/.Karabiner-VirtualHIDDevice-Manager.app/Contents/MacOS/Karabiner-VirtualHIDDevice-Manager activate
```

### 4. Start the driver daemon

```bash
sudo '/Library/Application Support/org.pqrs/Karabiner-DriverKit-VirtualHIDDevice/Applications/Karabiner-VirtualHIDDevice-Daemon.app/Contents/MacOS/Karabiner-VirtualHIDDevice-Daemon'
```

### 5. Add to Input Monitoring

Go to **System Settings → Privacy & Security → Input Monitoring** and add `/usr/local/bin/kanata`

### 6. Test manually

```bash
sudo /usr/local/bin/kanata --cfg /Users/mike/dev/personal/karabiner/kanata/kanata.kbd
```

### 7. Install as service (optional)

```bash
sudo cp com.kanata.plist /Library/LaunchDaemons/
sudo chown root:wheel /Library/LaunchDaemons/com.kanata.plist
sudo chmod 644 /Library/LaunchDaemons/com.kanata.plist
sudo launchctl bootstrap system /Library/LaunchDaemons/com.kanata.plist
```

## App Launch Sequences

After pressing the leader key (`.` + `/` together):

| Sequence | App |
|----------|-----|
| `a 1` | 1Password |
| `a b` | ChatGPT Atlas |
| `a c` | Zed |
| `a d` | Discord |
| `a e` | Superhuman |
| `a f` | Finder |
| `a g` | Chrome |
| `a i` | ChatGPT |
| `a n` | Notion |
| `a p` | Perplexity |
| `a r` | Reflect |
| `a s` | Slack |
| `a t` | Ghostty |
| `a v` | VS Code |
| `a z` | Cursor |

## Troubleshooting

### `IOHIDDeviceOpen: privilege violation`
Remove and re-add Kanata to Input Monitoring in System Settings.

### "cmd not allowed" error
You're using the Homebrew version. Use the included `kanata_cmd` binary instead.

### Can't type while Kanata is running
Ensure the Karabiner driver daemon is running.

## Resources

- [Kanata docs](https://github.com/jtroo/kanata/blob/main/docs/config.adoc)
- [Sample configs](https://github.com/jtroo/kanata/tree/main/cfg_samples)
- [Online simulator](https://jtroo.github.io/kanata-simulator/)
