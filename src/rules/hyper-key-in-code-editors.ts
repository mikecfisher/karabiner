/**
 * Code Editor-Specific Hyper Key Behaviors
 *
 * This module provides special handling for Hyper+key combinations in code editors,
 * translating them to Control+key for Vim navigation and commands
 */

import { rule, map, ifApp } from 'karabiner.ts';

import { APP_REGEXES } from '../utils/app-names';

// Define code editors
const codeEditors = ifApp([APP_REGEXES.VSCODE, APP_REGEXES.CURSOR, APP_REGEXES.ZED, APP_REGEXES.WEZTERM]);

// This rule intercepts Hyper+key combinations in code editors and translates them to Ctrl+key
export const hyperKeyInCodeEditors = rule('Code Editor Vim Navigation', codeEditors).manipulators([
  // Scrolling and navigation
  map('d', ['left_shift', 'left_command', 'left_control', 'left_option']).to('d', ['control']), // Ctrl+D: Scroll half-page down
  map('u', ['left_shift', 'left_command', 'left_control', 'left_option']).to('u', ['control']), // Ctrl+U: Scroll half-page up

  // Window navigation (from settings.json <C-h/j/k/l>)
  map('h', ['left_shift', 'left_command', 'left_control', 'left_option']).to('h', ['control']), // Ctrl+H: Move to left window
  map('j', ['left_shift', 'left_command', 'left_control', 'left_option']).to('j', ['control']), // Ctrl+J: Move to window below
  map('k', ['left_shift', 'left_command', 'left_control', 'left_option']).to('k', ['control']), // Ctrl+K: Move to window above
  map('l', ['left_shift', 'left_command', 'left_control', 'left_option']).to('l', ['control']), // Ctrl+L: Move to right window

  // Other common Vim control keys
  map('a', ['left_shift', 'left_command', 'left_control', 'left_option']).to('a', ['control']), // Ctrl+A: Increment number under cursor
]);
