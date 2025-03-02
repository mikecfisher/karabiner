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
export const hyperKeyInCodeEditors = rule('Hyper Key in Code Editors').manipulators([
  // Completely override Caps Lock in code editors
  map('caps_lock')
    .condition(codeEditors)
    .to([
      // Set hyper variable for layer activations
      { set_variable: { name: 'hyper', value: 1 } },
      // Send just Control, not all Hyper modifiers
      { key_code: 'left_control' },
    ])
    .toAfterKeyUp([{ set_variable: { name: 'hyper', value: 0 } }])
    .toIfAlone('escape'),

  // Handle specific keys when hyper is active in code editors
  // Half-page scrolling in Vim mode
  map('d').condition(codeEditors).condition(hyperActive).to('d', ['control']),

  map('u').condition(codeEditors).condition(hyperActive).to('u', ['control']),
]);
