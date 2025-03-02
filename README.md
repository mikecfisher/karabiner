# My Karabiner Elements configuration

This repo contains my personal Karabiner Elements configuration, heavily influenced by @mxstbr's [karabiner](https://github.com/mxstbr/karabiner) repo, and now powered by [karabiner.ts](https://github.com/evan-liu/karabiner.ts)

## Key Features

- **Hyper Key**: Caps Lock functions as a "Hyper" key (Cmd+Ctrl+Alt+Shift) when held, and Caps Lock when tapped
- **Smart Code Editor Support**: In VS Code, Cursor, and Zed, Caps Lock functions as Control for Vim commands while maintaining Hyper functionality for other shortcuts
- **Hyper Layers**: Multiple specialized layers that activate with Hyper+key, like:
  - Hyper+O: Open applications
  - Hyper+B: Open websites
  - Hyper+W: Window management
  - Hyper+S: System controls
  - and more...

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
