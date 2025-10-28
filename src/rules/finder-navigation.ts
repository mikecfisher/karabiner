import { rule, ifApp, map, mapSimultaneous, withCondition, ifVar } from 'karabiner.ts';

/**
 * Finder Navigation - Vim-style
 *
 * Provides vim-like navigation in Finder for efficient file management.
 * Uses a 'g' prefix for special navigation (similar to vim's gg for top)
 */

/**
 * Global Finder Vim Mode Exit
 * This rule is NOT app-specific so you can exit vim mode from any app
 */
export const finderVimModeExit = rule('Finder Vim Mode Exit (Global)').manipulators([
  withCondition(ifVar('finder_vim_mode', 1))([
    withCondition(ifVar('finder_g', 0))([
      map('escape').toVar('finder_vim_mode', 0).toRemoveNotificationMessage('finder_vim'),
    ]),
  ]),
]);

/**
 * Finder Vim Navigation
 *
 * VIM MODE TOGGLE:
 * - Press j+k simultaneously to enter Vim Mode (very vim-like!)
 * - Press escape to exit Vim Mode
 * - A notification shows when Vim Mode is active
 *
 * When in Vim Mode:
 *
 * Basic vim motions:
 * - j/k: Move down/up in file list
 * - Shift+j/k: Extend selection down/up
 * - h: Go to parent folder (up directory tree)
 * - l: Enter selected folder (down directory tree)
 *
 * Search (vim-like):
 * - /: Start search (Cmd+F)
 * - n: Find next (Cmd+G)
 * - N (Shift+n): Find previous (Cmd+Shift+G)
 *
 * File operations:
 * - d: Delete (move to trash)
 * - r: Rename
 * - m: Make new folder
 * - y: Yank/Copy (Cmd+C)
 * - p: Paste/Put (Cmd+V)
 * - x: Cut (Cmd+X)
 * - u: Undo (Cmd+Z)
 * - Ctrl+r: Redo (Cmd+Shift+Z)
 * - v: Quick Look (visual mode)
 *
 * Always active (g prefix navigation):
 * - gg: Go to top
 * - ge: Go to end/bottom
 * - gh: Go to home folder
 * - gd: Go to desktop
 * - gc: Go to computer
 * - ga: Go to applications
 * - gu: Go to utilities
 * - gi: Go to iCloud Drive
 * - gl: Go to downloads
 */
export const finderNavigation = rule('Finder Vim Navigation', ifApp(`^com\\.apple\\.finder$`)).manipulators([
  /**
   * Vim Mode Toggle
   * Press j+k simultaneously to enter vim mode (very vim-like!)
   */
  withCondition(ifVar('finder_vim_mode', 0))([
    mapSimultaneous(['j', 'k'], undefined, 50)
      .toVar('finder_vim_mode', 1)
      .toNotificationMessage('finder_vim', '🎯 Finder Vim Mode: ON (ESC to exit)'),
  ]),

  /**
   * G-prefix navigation mode (MUST BE BEFORE VIM MODE for priority)
   * Press 'g' to activate, then another key for the action
   * These work even when vim mode is OFF
   */

  // Activate g-mode
  withCondition(ifVar('finder_g', 0))([map('g').toVar('finder_g', 1)]),

  // G-mode actions
  withCondition(ifVar('finder_g', 1))([
    // gg - Jump to and select first item (like vim)
    map('g')
      .to('left_arrow', 'fn') // fn+left_arrow is macOS home
      .toVar('finder_g', 0),

    // ge - Jump to and select last item (like vim)
    map('e')
      .to('right_arrow', 'fn') // fn+right_arrow is macOS end
      .toVar('finder_g', 0),

    // gh - Go to home
    map('h')
      .to('h', ['command', 'shift']) // Cmd+Shift+H = Home folder
      .toVar('finder_g', 0),

    // gd - Go to desktop
    map('d')
      .to('d', ['command', 'shift']) // Cmd+Shift+D = Desktop
      .toVar('finder_g', 0),

    // gc - Go to computer
    map('c')
      .to('c', ['command', 'shift']) // Cmd+Shift+C = Computer
      .toVar('finder_g', 0),

    // ga - Go to applications
    map('a')
      .to('a', ['command', 'shift']) // Cmd+Shift+A = Applications
      .toVar('finder_g', 0),

    // gu - Go to utilities
    map('u')
      .to('u', ['command', 'shift']) // Cmd+Shift+U = Utilities
      .toVar('finder_g', 0),

    // gi - Go to iCloud Drive
    map('i')
      .to('i', ['command', 'shift']) // Cmd+Shift+I = iCloud Drive
      .toVar('finder_g', 0),

    // gl - Go to Downloads
    map('l')
      .to('l', ['command', 'option']) // Cmd+Option+L = Downloads folder
      .toVar('finder_g', 0),

    // Escape g-mode
    map('escape').toVar('finder_g', 0),
  ]),

  /**
   * Vim Mode Commands
   * Only active when finder_vim_mode = 1 AND NOT in g-mode
   */
  withCondition(ifVar('finder_vim_mode', 1))([
    withCondition(ifVar('finder_g', 0))([
      // Basic vim motions
      map('j').to('down_arrow'),
      map('k').to('up_arrow'),
      map('h').to('up_arrow', 'command'), // Go to parent folder (like vim file managers)
      map('l').to('down_arrow', 'command'), // Enter selected folder (like vim file managers)

      // Selection extension (vim visual mode-like)
      map('j', 'shift').to('down_arrow', 'shift'), // Extend selection down
      map('k', 'shift').to('up_arrow', 'shift'), // Extend selection up

      // Search
      map('slash').to('f', 'command'), // Start search
      map('n').to('g', 'command'), // Find next (like vim)
      map('n', 'shift').to('g', ['command', 'shift']), // Find previous (like vim N)

      // File operations
      map('d').to('delete_or_backspace', 'command'), // Delete (Cmd+Delete = move to trash)
      map('r').to('return_or_enter'), // Rename (Enter in Finder)
      map('m').to('n', ['command', 'shift']), // Make new folder

      // Vim-like file operations
      map('y').to('c', 'command'), // Yank/Copy (like vim)
      map('p').to('v', 'command'), // Paste/Put (like vim)
      map('x').to('x', 'command'), // Cut (like vim's delete to register)
      map('u').to('z', 'command'), // Undo (like vim)
      map('r', 'control').to('z', ['command', 'shift']), // Redo (Ctrl+r like vim)

      // Visual selection (like vim's v)
      map('v').to('spacebar'), // Quick Look
    ]),
  ]),
]);
