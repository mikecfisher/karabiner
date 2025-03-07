import { toPaste, type FromKeyParam, type ToEvent } from 'karabiner.ts';

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
 * Generate emoji manipulators using the provided leaderAction function
 * @param leaderActionFn Function to create a leader action
 */
export const generateEmojiManipulators = (leaderActionFn: (key: FromKeyParam, action: ToEvent | ToEvent[]) => any) => {
  return emojiDefinitions.map(({ key, emoji }) => leaderActionFn(key as FromKeyParam, toPaste(emoji)));
};
