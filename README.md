# karabiner

Personal macOS keyboard-automation workspace containing two related remapping setups:

- `karabiner/` — a Karabiner-Elements configuration generated from TypeScript with `karabiner.ts`.
- `kanata/` — a Kanata-based configuration with Hammerspoon visual overlays and a setup script for running Kanata as a macOS service.

Both setups implement a Vim-inspired leader-key workflow for app launching, browser/navigation shortcuts, window management, Raycast commands, system actions, and editor-friendly modifier behavior.

## Key features

- Leader key activated by pressing `.` and `/` together.
- Layered app, browser, window, Raycast, system, and messaging shortcuts.
- Caps Lock remapping patterns for Escape/Control or editor-specific Control behavior.
- Vim-style navigation helpers for apps such as Finder, Slack, browsers, and Lexicon.
- Optional Hammerspoon overlays in the Kanata setup to show active layers and available keys.

## Rough stack

- macOS
- Karabiner-Elements / `karabiner.ts` / Bun / TypeScript in `karabiner/`
- Kanata, Hammerspoon, LaunchDaemon config, and shell setup scripts in `kanata/`

## Getting started

For the Karabiner-Elements generator:

```bash
cd karabiner
bun install
bun run generate
bun run apply
```

For the Kanata setup:

```bash
cd kanata
./setup.sh
```

See the nested READMEs in `karabiner/` and `kanata/` for the full shortcut reference, prerequisites, permissions, and uninstall instructions.
