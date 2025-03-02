/**
 * Code Editor-Specific Hyper Key Behaviors
 *
 * This module provides dual functionality for Caps Lock in code editors:
 * 1. Acts as Control for Vim commands (Ctrl+D, Ctrl+U, etc.)
 * 2. Allows Hyper key combinations to still work via variable
 */

import { rule, map, ifApp, ifVar } from 'karabiner.ts';
import { APP_REGEXES } from '../constants';

// Define code editors
const codeEditors = ifApp([APP_REGEXES.VSCODE, APP_REGEXES.CURSOR, APP_REGEXES.ZED]);

// Create a condition for when hyper is active
const hyperActive = ifVar('hyper', 1);

// This rule completely overrides Caps Lock in code editors
export const hyperKeyInCodeEditors = rule('Code Editor Vim Navigation', codeEditors).manipulators([
  // Half-page scrolling
  map('d', ['left_shift', 'left_command', 'left_control', 'left_option']).to('d', ['control']),
  map('u', ['left_shift', 'left_command', 'left_control', 'left_option']).to('u', ['control']),
]);
