/**
 * Menu definition with key, action, and description
 */
export interface MenuOption {
  key: string;
  description: string;
}

/**
 * Menu category with submenu options
 */
export interface MenuCategory {
  key: string;
  name: string;
  varValue: string;
  options: MenuOption[];
}

/**
 * All available menu categories
 */
export const menuCategories: MenuCategory[] = [
  {
    key: 'a',
    name: 'Apps',
    varValue: 'apps',
    options: [
      { key: 'a', description: 'Akiflow' },
      { key: 'b', description: 'Browser' },
      { key: 'c', description: 'Cursor' },
      { key: 'd', description: 'Discord' },
      { key: 'f', description: 'Finder' },
      { key: 'g', description: 'Google Chrome' },
      { key: 'i', description: 'ChatGPT' },
      { key: 'l', description: 'Lexicon' },
      { key: 'n', description: 'Notion' },
      { key: 'p', description: 'Perplexity' },
      { key: 's', description: 'Slack' },
      { key: 't', description: 'Terminal' },
      { key: 'v', description: 'VS Code' },
      { key: 'w', description: 'Teams' },
      { key: 'z', description: 'Zed' },
    ],
  },
  {
    key: 'r',
    name: 'Raycast',
    varValue: 'raycast',
    options: [
      { key: 'c', description: 'Camera' },
      { key: 'e', description: 'Emoji' },
      { key: 'g', description: 'Google' },
      { key: 'h', description: 'History' },
      { key: 'i', description: 'IA Chat' },
      { key: 'n', description: 'Notifications' },
      { key: 'p', description: 'Confetti' },
    ],
  },
  {
    key: 'w',
    name: 'Window',
    varValue: 'window',
    options: [
      { key: 'c', description: 'Center' },
      { key: 'f', description: 'Fullscreen' },
      { key: 'h', description: 'Left' },
      { key: 'j', description: 'Bottom' },
      { key: 'k', description: 'Top' },
      { key: 'l', description: 'Right' },
      { key: '[', description: 'Previous Display' },
      { key: ']', description: 'Next Display' },
      { key: '-', description: 'Previous Desktop' },
      { key: '=', description: 'Next Desktop' },
    ],
  },
  {
    key: 'b',
    name: 'Browser',
    varValue: 'browser',
    options: [
      { key: 'g', description: 'GitHub' },
      { key: 't', description: 'Twitter' },
      { key: 'h', description: 'Hacker News' },
      { key: 'r', description: 'Reddit' },
      { key: 'y', description: 'YouTube' },
      { key: 'c', description: 'ChatGPT' },
    ],
  },
  {
    key: 's',
    name: 'System',
    varValue: 'system',
    options: [
      { key: 'd', description: 'Do Not Disturb' },
      { key: 'l', description: 'Lock Screen' },
      { key: 'e', description: 'Emoji Picker' },
    ],
  },
  {
    key: 'c',
    name: 'Code',
    varValue: 'code',
    options: [
      { key: 'l', description: 'Log' },
      { key: 'f', description: 'Function' },
      { key: 'i', description: 'If' },
      { key: 'r', description: 'Return' },
      { key: 't', description: 'This' },
    ],
  },
  {
    key: 't',
    name: 'AeroSpace',
    varValue: 'aerospace',
    options: [
      { key: 's', description: 'Stack Layout' },
      { key: 'f', description: 'Float Toggle' },
      { key: 'u', description: 'Fullscreen' },
      { key: 'z', description: 'Balance Sizes' },
      { key: 'h', description: 'Focus Left' },
      { key: 'j', description: 'Focus Down' },
      { key: 'k', description: 'Focus Up' },
      { key: 'l', description: 'Focus Right' },
      { key: '⇧h', description: 'Move Left' },
      { key: '⇧j', description: 'Move Down' },
      { key: '⇧k', description: 'Move Up' },
      { key: '⇧l', description: 'Move Right' },
      { key: '1', description: 'Workspace 1' },
      { key: '2', description: 'Workspace 2' },
      { key: '3', description: 'Workspace 3' },
      { key: '4', description: 'Workspace 4' },
      { key: '5', description: 'Workspace 5' },
      { key: 'b', description: 'Workspace B' },
      { key: 'c', description: 'Workspace C' },
      { key: 't', description: 'Workspace T' },
      { key: '⇧(N)', description: 'Move to (N)' },
      { key: '-', description: 'Resize -50' },
      { key: '=', description: 'Resize +50' },
      { key: 'slash', description: 'Tiles Layout' },
      { key: 'comma', description: 'Accordion Layout' },
      { key: 'semicolon', description: 'Service Mode' },
    ],
  },
];

/**
 * Generate notification text from menu options
 * Format: (A)Option1 (B)Option2 (C)Option3 ...
 */
export const generateMenuNotificationText = (options: MenuOption[]): string => {
  return options.map(({ key, description }) => `(${key.toUpperCase()})${description}`).join(' ');
};
