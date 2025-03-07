export const RAYCAST = {
  WINDOW: {
    CENTER: "open -g 'raycast://extensions/raycast/window-management/center-half'",
    TOP: "open -g 'raycast://extensions/raycast/window-management/top-half'",
    BOTTOM: "open -g 'raycast://extensions/raycast/window-management/bottom-half'",
    LEFT: "open -g 'raycast://extensions/raycast/window-management/left-half'",
    RIGHT: "open -g 'raycast://extensions/raycast/window-management/right-half'",
    MAXIMIZE: "open -g 'raycast://extensions/raycast/window-management/maximize'",
    CUSTOM: (name: string) =>
      `open -g 'raycast://raycast/customWindowManagementCommand?name=${encodeURIComponent(name)}'`,
  },
  WINDOW_LAYOUTS: {
    REACT_NATIVE: 'React Native Dev',
  },
  SYSTEM: {
    DO_NOT_DISTURB: "open 'raycast://extensions/do-not-disturb/toggle'",
    CAMERA: "open 'raycast://extensions/raycast/system/open-camera'",
    EMOJI_SEARCH: "open 'raycast://extensions/raycast/emoji-symbols/search-emoji-symbols'",
    GOOGLE_SEARCH: "open 'raycast://extensions/mblode/google-search/index'",
    CLIPBOARD_HISTORY: "open 'raycast://extensions/raycast/clipboard-history/clipboard-history'",
    AI_CHAT: "open 'raycast://extensions/raycast/raycast-ai/ai-chat'",
    DISMISS_NOTIFICATIONS: "open 'raycast://script-commands/dismiss-notifications'",
    CONFETTI: "open 'raycast://extensions/raycast/raycast/confetti'",
  },
} as const;

export const URLS = {
  GOOGLE: "open 'https://google.com'",
  TWITTER: "open 'https://twitter.com'",
  HACKER_NEWS: "open 'https://news.ycombinator.com'",
  FACEBOOK: "open 'https://facebook.com'",
  REDDIT: "open 'https://reddit.com'",
  PERPLEXITY: "open 'https://perplexity.com'",
  GITHUB: "open 'https://github.com'",
  YOUTUBE: "open 'https://youtube.com'",
  LINKEDIN: "open 'https://linkedin.com'",
  CHATGPT: "open 'https://chatgpt.com'",
} as const;

export const APP_REGEXES = {
  VSCODE: '^com\\.microsoft\\.VSCode$',
  CURSOR: '^com\\.todesktop\\.230313mzl4w4u92$',
  ZED: '^dev\\.zed\\.Zed$',
  LEXICON: '^com\\.rekord\\.cloud\\.lexicon$',
  GHOSTTY: '^com\\.ghostty\\.Ghostty$',
  CHROME: '^com\\.google\\.Chrome$',
  ARC: '^company\\.thebrowser\\.Arc$',
} as const;

export const APP_NAMES = {
  PASSWORD_MANAGER: '1Password',
  AKIFLOW: 'Akiflow',
  ARC: 'Arc',
  CURSOR: 'Cursor',
  DISCORD: 'Discord',
  SUPERHUMAN: 'Superhuman',
  FINDER: 'Finder',
  CHROME: 'Google Chrome',
  FIGMA: 'Figma',
  CHATGPT: 'ChatGPT',
  TEXTS: 'Texts',
  NOTION: 'Notion',
  SPOTIFY: 'Spotify',
  REFLECT: 'Reflect',
  SLACK: 'Slack',
  WARP: 'Warp',
  GHOSTTY: 'GHOSTTY',
  VSCODE: 'Visual Studio Code',
  LEXICON: 'Lexicon',
  ZED: 'Zed',
} as const;
