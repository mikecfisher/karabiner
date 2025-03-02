/**
 * Code Editor-Specific Hyper Key Behaviors
 *
 * This module defines special behaviors for the Hyper key when used in code editors.
 * It currently supports Cursor, VS Code, and Zed editors.
 *
 * Special mappings:
 * - Hyper + D -> Control + D (for scrolling down half-page in Vim mode)
 * - Hyper + U -> Control + U (for scrolling up half-page in Vim mode)
 *
 * These mappings allow for Vim-style navigation while maintaining the Hyper key's
 * functionality for other shortcuts. The mappings only activate when:
 * 1. One of the supported code editors is the active window
 * 2. The hyper variable is set to 1 (Caps Lock is being held)
 */

import { rule, map, ifApp, ifVar } from 'karabiner.ts';
import { APP_REGEXES } from '../constants';

// Define code editors as a condition
const codeEditors = ifApp([APP_REGEXES.VSCODE, APP_REGEXES.CURSOR, APP_REGEXES.ZED]);

// Define hyper variable condition
const whenHyperActive = ifVar('hyper', 1);

// Create rule for Vim-style half-page scrolling in code editors
export const hyperKeyInCodeEditors = rule('Vim-style Navigation in Code Editors', codeEditors).manipulators([
  // Half-page scrolling down: Hyper+D -> Control+D
  map('d').condition(whenHyperActive).to('d', ['control']),

  // Half-page scrolling up: Hyper+U -> Control+U
  map('u').condition(whenHyperActive).to('u', ['control']),
]);
