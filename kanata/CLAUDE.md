# Kanata Configuration Guide

## Repository Structure

```
kanata/
├── kanata.kbd           # Main config - includes other files, defines base layer
├── apps.kbd             # App launching sequences (Leader → a → key)
├── windows.kbd          # Window management sequences (Leader → w → key)
├── kanata-commands.kbd  # Kanata control sequences (Leader → k → key)
├── kanata_cmd           # Binary with cmd feature enabled (NOT Homebrew version)
├── com.kanata.plist     # launchd service definition
└── setup.sh             # Installation script
```

## Running Kanata

### Test Changes Manually
```bash
sudo /usr/local/bin/kanata --cfg /Users/mike/dev/personal/karabiner/kanata/kanata.kbd
```

### Reload Config (While Running)
Press: Leader → k → r (`. + /` together, then `k`, then `r`)

### Service Management
```bash
# Start
sudo launchctl bootstrap system /Library/LaunchDaemons/com.kanata.plist

# Stop
sudo launchctl bootout system /Library/LaunchDaemons/com.kanata.plist

# View logs
tail -f /var/log/kanata.error.log
```

---

## Kanata Syntax Guide

### Sequences (Leader Key Combos)

Sequences are two-part definitions:

```lisp
;; 1. Define the sequence trigger
(defseq sequence-name (key1 key2))

;; 2. Define what the sequence does
(defvirtualkeys
  sequence-name (action)
)
```

The sequence name MUST match exactly between `defseq` and `defvirtualkeys`.

### Running Shell Commands

```lisp
;; Basic command
(cmd open -b com.apple.finder)

;; Command with URL scheme - use -g to prevent focus stealing
(cmd open -g "raycast://extensions/raycast/window-management/left-half")

;; Multiple actions
(multi lrld (cmd terminal-notifier -title "Kanata" -message "Done"))
```

### Opening Apps

Prefer bundle IDs over paths:
```lisp
;; Good - bundle ID
(cmd open -b com.apple.finder)

;; Okay - path (use for apps without standard bundle IDs)
(cmd open "/Applications/Some App.app")
```

To find a bundle ID:
```bash
osascript -e 'id of app "AppName"'
# or
mdls -name kMDItemCFBundleIdentifier /Applications/AppName.app
```

### Key Aliases

```lisp
(defalias
  cap (tap-hold 200 200 esc lctl)  ;; tap=esc, hold=ctrl
)
```

### Chords (Simultaneous Keys)

```lisp
(defchordsv2
  (. /) sldr 50 first-release ()  ;; . and / together triggers 'sldr'
)
```

---

## Quirks and Gotchas

### 1. Binary Must Have `cmd` Feature
The Homebrew kanata does NOT include the `cmd` feature. You must use `kanata_cmd` from GitHub releases or build with `--features cmd`.

### 2. URL Schemes Need `-g` Flag
Without `-g`, opening URL schemes steals focus from the current window, which breaks window management commands:
```lisp
;; Bad - steals focus
(cmd open "raycast://...")

;; Good - opens in background
(cmd open -g "raycast://...")
```

### 3. Karabiner Driver Required
Kanata uses Karabiner's VirtualHIDDevice driver. Karabiner-Elements app must be installed (but not running) for the driver to be available.

### 4. Cannot Run With Karabiner-Elements
Kanata and Karabiner-Elements cannot run simultaneously - they share the same driver.

### 5. Sequence Timeout
Sequences must be completed within 1500ms (configured in `defcfg`). If typing is slow, the sequence fails silently.

### 6. Leader Key is a Chord
The leader key is `.` + `/` pressed together (not sequentially). This is defined as `sldr` in the chord config.

### 7. Include Order Matters
Files are included at the end of `kanata.kbd`. All `defseq` and `defvirtualkeys` are collected across files.

### 8. Testing Syntax
Use the online simulator to test syntax before applying:
https://jtroo.github.io/kanata-simulator/

### 9. Notification Dependency
The reload notification uses `terminal-notifier`. Install with:
```bash
brew install terminal-notifier
```

### 10. Config Path is Hardcoded
The launchd plist has an absolute path to the config. If you move the repo, update `com.kanata.plist`.

---

## Adding New Sequences

### New App Launcher
In `apps.kbd`:
```lisp
;; Add to defseq section
(defseq open-myapp (a x))  ;; Leader → a → x

;; Add to defvirtualkeys section
(defvirtualkeys
  ;; ... existing entries ...
  open-myapp (cmd open -b com.example.myapp)
)
```

### New Window Command
In `windows.kbd`:
```lisp
(defseq win-new-action (w x))

(defvirtualkeys
  ;; ... existing entries ...
  win-new-action (cmd open -g "raycast://extensions/raycast/window-management/action-name")
)
```

### New Command Category
Create a new `.kbd` file and include it in `kanata.kbd`:
```lisp
(include mynewfile.kbd)
```

---

## Reference

- [Kanata docs](https://github.com/jtroo/kanata/blob/main/docs/config.adoc)
- [Sample configs](https://github.com/jtroo/kanata/tree/main/cfg_samples)
- [Online simulator](https://jtroo.github.io/kanata-simulator/)
