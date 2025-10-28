# My Karabiner Elements Configuration

This repo contains my personal Karabiner Elements configuration, heavily influenced by [@mxstbr's karabiner](https://github.com/mxstbr/karabiner) repo, and now powered by [karabiner.ts](https://github.com/evan-liu/karabiner.ts)

## 🎯 Key Features

- **Leader Key System**: Vim-inspired leader key for launching apps, managing windows, and quick actions
- **Finder Vim Mode**: Full vim-style navigation in Finder with toggleable mode
- **Browser Navigation**: Vim-style shortcuts for browser navigation (Arc, Safari, Chrome, Zen, Brave)
- **Caps Lock as Control**: Smart Caps Lock that works as Control in code editors
- **Lexicon Vim Navigation**: Vim keys for navigating Lexicon

## 📖 Keyboard Shortcuts Reference

### Leader Key System

The leader key system uses a three-step sequence inspired by Vim's leader key concept.

**Activation**: Press `.` and `/` simultaneously

**Categories**:

- `A` - Apps
- `R` - Raycast commands
- `W` - Window management
- `B` - Browser shortcuts (open websites)
- `S` - System controls
- `E` - Emoji shortcuts
- `C` - Code snippets
- `N` - Clear notifications (immediate action)
- `T` - Tiling/AeroSpace commands

**Press `Escape` at any time to exit leader mode**

---

#### Apps (`./` → `A`)

Launch applications quickly:

| Key | Application        |
| --- | ------------------ |
| `1` | 1Password          |
| `a` | Akiflow            |
| `b` | ChatGPT Atlas      |
| `c` | Cursor             |
| `d` | Discord            |
| `e` | Superhuman         |
| `f` | Finder             |
| `g` | Google Chrome      |
| `i` | ChatGPT            |
| `m` | Beeper             |
| `n` | Notion             |
| `o` | iOS Simulator      |
| `p` | Perplexity         |
| `r` | Reflect            |
| `s` | Slack              |
| `t` | Ghostty (Terminal) |
| `v` | VS Code            |
| `w` | Microsoft Teams    |
| `x` | Lexicon            |
| `y` | Figma              |
| `z` | Zed                |

---

#### Raycast (`./` → `R`)

Quick Raycast commands:

| Key | Action                |
| --- | --------------------- |
| `c` | Open Camera           |
| `e` | Emoji Search          |
| `g` | Google Search         |
| `h` | Clipboard History     |
| `i` | AI Chat               |
| `n` | Dismiss Notifications |
| `p` | Confetti 🎉           |

---

#### Window Management (`./` → `W`)

Control window positions via Raycast:

| Key | Action              |
| --- | ------------------- |
| `c` | Center window       |
| `f` | Maximize/Fullscreen |
| `h` | Left half           |
| `j` | Bottom half         |
| `k` | Top half            |
| `l` | Right half          |
| `[` | Previous display    |
| `]` | Next display        |
| `-` | Previous desktop    |
| `=` | Next desktop        |

---

#### Browser Shortcuts (`./` → `B`)

Open websites directly:

| Key | Website     |
| --- | ----------- |
| `c` | ChatGPT     |
| `g` | GitHub      |
| `h` | Hacker News |
| `l` | LinkedIn    |
| `p` | Perplexity  |
| `r` | Reddit      |
| `t` | Twitter     |
| `y` | YouTube     |

---

#### System Controls (`./` → `S`)

System-level actions:

| Key | Action                |
| --- | --------------------- |
| `d` | Toggle Do Not Disturb |
| `l` | Lock screen           |
| `e` | Emoji picker          |

---

#### Emoji Shortcuts (`./` → `E`)

Quick emoji paste:

| Key | Emoji | Description       |
| --- | ----- | ----------------- |
| `j` | 😂    | Joy/Laughing      |
| `h` | ❤️    | Heart             |
| `t` | 👍    | Thumbs up         |
| `f` | 🔥    | Fire              |
| `s` | 🙁    | Slightly frowning |
| `o` | 😍    | Heart eyes        |
| `p` | 🙏    | Prayer/Thank you  |
| `c` | 👏    | Clap              |
| `l` | 🥰    | Love              |
| `w` | 🙂    | Smile             |
| `e` | 🤔    | Thinking          |
| `a` | 😅    | Sweat smile       |
| `r` | 🚀    | Rocket            |
| `v` | ✅    | Check mark        |
| `g` | 😬    | Grimacing         |
| `m` | 🤯    | Mind blown        |
| `z` | 😎    | Sunglasses        |
| `b` | 💪    | Flexed biceps     |

---

#### Code Snippets (`./` → `C`)

Insert common code patterns:

| Key | Snippet          |
| --- | ---------------- |
| `l` | `console.log();` |
| `f` | `() => {}`       |
| `i` | `if () {}`       |
| `r` | `return `        |
| `t` | `this.`          |

---

### Finder Vim Mode

Vim-style navigation in Finder with a toggleable mode to prevent conflicts with text input.

**Toggle Vim Mode**: Press `j` + `k` simultaneously
**Exit Vim Mode**: Press `Escape` (works from any app, not just Finder)
**Notification**: Shows "🎯 Finder Vim Mode: ON" when active

> **Note**: G-prefix navigation (gg, gh, gd, etc.) works even when Vim Mode is OFF, and has priority over vim mode commands to ensure folder navigation works correctly.

#### When Vim Mode is Active:

**Basic Navigation**:
| Key | Action |
|-----|--------|
| `j` | Move down |
| `k` | Move up |
| `h` | Go to parent folder |
| `l` | Enter selected folder |

**Selection**:
| Key | Action |
|-----|--------|
| `Shift+j` | Extend selection down |
| `Shift+k` | Extend selection up |

**Search** (vim-like):
| Key | Action |
|-----|--------|
| `/` | Start search |
| `n` | Find next |
| `N` (Shift+n) | Find previous |

**File Operations**:
| Key | Action |
|-----|--------|
| `d` | Delete (move to trash) |
| `r` | Rename |
| `m` | Make new folder |
| `y` | Yank/Copy |
| `p` | Paste |
| `x` | Cut |
| `u` | Undo |
| `Ctrl+r` | Redo |
| `v` | Quick Look |

#### Always Active (G-prefix Navigation):

These work even when vim mode is OFF:

| Key  | Action                   |
| ---- | ------------------------ |
| `gg` | Go to top of list        |
| `ge` | Go to end/bottom of list |
| `gh` | Go to Home folder        |
| `gd` | Go to Desktop            |
| `gc` | Go to Computer           |
| `ga` | Go to Applications       |
| `gu` | Go to Utilities          |
| `gi` | Go to iCloud Drive       |
| `gl` | Go to Downloads          |

---

### Browser Navigation

Vim-style shortcuts that work in Arc, Safari, Chrome, Zen, Brave, and ChatGPT Atlas:

| Key                              | Action             |
| -------------------------------- | ------------------ |
| `Ctrl+Option+h`                  | Back in history    |
| `Ctrl+Option+l`                  | Forward in history |
| `Ctrl+h`                         | Previous tab       |
| `Ctrl+l`                         | Next tab           |
| `Hyper+h` (Cmd+Ctrl+Alt+Shift+h) | Previous window    |
| `Hyper+l` (Cmd+Ctrl+Alt+Shift+l) | Next window        |

---

### Lexicon Vim Navigation

When in Lexicon, Cmd+hjkl becomes arrow keys:

| Key     | Action      |
| ------- | ----------- |
| `Cmd+j` | Down arrow  |
| `Cmd+k` | Up arrow    |
| `Cmd+h` | Left arrow  |
| `Cmd+l` | Right arrow |

---

### Caps Lock Behavior

- **Hold**: Functions as Control (for Vim commands in code editors)
- **Tap**: Functions as Caps Lock

## Installation

1. Install & start [Karabiner Elements](https://karabiner-elements.pqrs.org/)
1. Clone this repository

## Development

```
pnpm install
```

to install the dependencies. (one-time only)

```
pnpm run generate
```

builds the `karabiner.json` from the `rules.ts`.

```
pnpm run restart:kb
```

restarts the Karabiner service to apply changes.

## Customization

This configuration is optimized for my personal workflow, but you can easily adapt it:

1. Modify the Hyper layers in `rules.ts` to include your own applications and shortcuts
2. Adjust the code editor-specific behavior in `rules/hyper-key-in-code-editors.ts`
3. Add your own rules following the karabiner.ts pattern

The current implementation uses karabiner.ts, which provides a clean, type-safe API for creating Karabiner Elements configurations.
