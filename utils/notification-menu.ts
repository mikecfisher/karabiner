import { type FromKeyParam } from 'karabiner.ts';

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
      { key: 'n', description: 'Notion' },
      { key: 's', description: 'Slack' },
      { key: 't', description: 'Terminal' },
      { key: 'v', description: 'VS Code' },
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
];

/**
 * Generate notification text from menu options
 * Format: (A)Option1 (B)Option2 (C)Option3 ...
 */
export const generateMenuNotificationText = (options: MenuOption[]): string => {
  return options.map(({ key, description }) => `(${key.toUpperCase()})${description}`).join(' ');
};
