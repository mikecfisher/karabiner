/**
 * Single source of truth for all application names and their bundle identifier regexes
 */
export interface AppDefinition {
  name: string;
  regex?: string;
}

export const APPS = {
  AKIFLOW: {
    name: 'Akiflow',
  },
  ARC: {
    name: 'Arc',
    regex: '^company\\.thebrowser\\.Browser$',
  },
  BEEPER: {
    name: 'Beeper Desktop',
    regex: '^com\\.automattic\\.beeper\\.desktop$',
  },
  BRAVE: {
    name: 'Brave',
    regex: '^com\\.brave\\.Browser$',
  },
  CHATGPT: {
    name: 'ChatGPT',
  },
  CHATGPT_ATLAS: {
    name: 'ChatGPT Atlas',
    regex: '^com\\.openai\\.atlas$',
  },
  CHROME: {
    name: 'Google Chrome',
    regex: '^com\\.google\\.Chrome$',
  },
  CURSOR: {
    name: 'Cursor',
    regex: '^com\\.todesktop\\.230313mzl4w4u92$',
  },
  DIA: {
    name: 'DIA',
    regex: '^company\\.thebrowser\\.dia$',
  },
  DISCORD: {
    name: 'Discord',
  },
  FIGMA: {
    name: 'Figma',
    regex: '^com\\.figma\\.Desktop$',
  },
  FINDER: {
    name: 'Finder',
  },
  GHOSTTY: {
    name: 'GHOSTTY',
    regex: '^com\\.ghostty\\.Ghostty$',
  },
  IOS_SIMULATOR: {
    name: 'Simulator',
    regex: '^com\\.apple\\.iphonesimulator$',
  },
  LEXICON: {
    name: 'Lexicon',
    regex: '^com\\.rekord\\.cloud\\.lexicon$',
  },
  NOTION: {
    name: 'Notion',
  },
  PASSWORD_MANAGER: {
    name: '1Password',
  },
  PERPLEXITY: {
    name: 'Perplexity',
  },
  REFLECT: {
    name: 'Reflect',
  },
  SAFARI: {
    name: 'Safari',
    regex: '^com\\.apple\\.Safari$',
  },
  SLACK: {
    name: 'Slack',
    regex: '^com\\.tinyspeck\\.slackmacgap$',
  },
  SPOTIFY: {
    name: 'Spotify',
  },
  SUPERHUMAN: {
    name: 'Superhuman',
  },
  TEAMS: {
    name: 'Microsoft Teams',
  },
  TEXTS: {
    name: 'Texts',
  },
  VSCODE: {
    name: 'Visual Studio Code',
    regex: '^com\\.microsoft\\.VSCode$',
  },
  WARP: {
    name: 'Warp',
  },
  ZED: {
    name: 'Zed',
    regex: '^dev\\.zed\\.Zed$',
  },
  ZEN: {
    name: 'Zen Browser',
    regex: '^app\\.zen-browser\\.zen$',
  },
} as const satisfies Record<string, AppDefinition>;

/**
 * Derived app names object for convenience
 */
export const APP_NAMES = Object.fromEntries(Object.entries(APPS).map(([key, value]) => [key, value.name])) as {
  [K in keyof typeof APPS]: (typeof APPS)[K]['name'];
};

/**
 * Helper type to extract only apps with regexes
 */
type AppsWithRegex = {
  [K in keyof typeof APPS as (typeof APPS)[K] extends { regex: string } ? K : never]: (typeof APPS)[K] extends {
    regex: string;
  }
    ? (typeof APPS)[K]['regex']
    : never;
};

/**
 * Derived app regexes object for convenience
 */
export const APP_REGEXES: AppsWithRegex = {
  ARC: APPS.ARC.regex,
  BEEPER: APPS.BEEPER.regex,
  BRAVE: APPS.BRAVE.regex,
  CHATGPT_ATLAS: APPS.CHATGPT_ATLAS.regex,
  CHROME: APPS.CHROME.regex,
  CURSOR: APPS.CURSOR.regex,
  DIA: APPS.DIA.regex,
  FIGMA: APPS.FIGMA.regex,
  GHOSTTY: APPS.GHOSTTY.regex,
  IOS_SIMULATOR: APPS.IOS_SIMULATOR.regex,
  LEXICON: APPS.LEXICON.regex,
  SAFARI: APPS.SAFARI.regex,
  SLACK: APPS.SLACK.regex,
  VSCODE: APPS.VSCODE.regex,
  ZED: APPS.ZED.regex,
  ZEN: APPS.ZEN.regex,
};
