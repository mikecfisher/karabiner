import { toPaste, type FromKeyParam, type ToEvent, type Manipulator } from 'karabiner.ts';

/**
 * Emoji definitions with key mapping, emoji character, and description
 */
export interface EmojiDefinition {
  key: string;
  emoji: string;
  description: string;
}

/**
 * All available emoji definitions
 */
export const emojiDefinitions: EmojiDefinition[] = [
  { key: 'j', emoji: '😂', description: 'Joy/Laughing' },
  { key: 'h', emoji: '❤️', description: 'Heart' },
  { key: 't', emoji: '👍', description: 'Thumbs up' },
  { key: 'f', emoji: '🔥', description: 'Fire' },
  { key: 's', emoji: '🙁', description: 'Slightly frowning face' },
  { key: 'o', emoji: '😍', description: 'Heart eyes' },
  { key: 'p', emoji: '🙏', description: 'Prayer/Thank you' },
  { key: 'c', emoji: '👏', description: 'Clap' },
  { key: 'l', emoji: '🥰', description: 'Love/Smiling with hearts' },
  { key: 'w', emoji: '🙂', description: 'Smile' },
  { key: 'e', emoji: '🤔', description: 'Thinking' },
  { key: 'a', emoji: '😅', description: 'Sweat smile' },
  { key: 'r', emoji: '🚀', description: 'Rocket' },
  { key: 'v', emoji: '✅', description: 'Check mark' },
  { key: 'g', emoji: '😬', description: 'Grimacing' },
  { key: 'm', emoji: '🤯', description: 'Mind blown' },
  { key: 'z', emoji: '😎', description: 'Sunglasses' },
  { key: 'b', emoji: '💪', description: 'Flexed biceps' },
];

/**
 * Generate notification text from emoji definitions
 * Format: (J)😂 (H)❤️ (T)👍 ...
 */
export const generateEmojiNotificationText = (): string => {
  return emojiDefinitions.map(({ key, emoji }) => `(${key.toUpperCase()})${emoji}`).join(' ');
};

/**
 * Type for a function that creates a leader action
 * Using only exported types from karabiner.ts
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LeaderActionFn = (key: FromKeyParam, action: ToEvent | ToEvent[]) => any; // Using 'any' here since we can't access the exact return type

/**
 * Generate emoji manipulators using the provided leaderAction function
 * @param leaderActionFn Function to create a leader action
 */
export const generateEmojiManipulators = (leaderActionFn: LeaderActionFn): Manipulator[] => {
  return emojiDefinitions.map(({ key, emoji }) => leaderActionFn(key as FromKeyParam, toPaste(emoji))) as Manipulator[]; // Cast the result to Manipulator[]
};
