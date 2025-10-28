import { rule, ifApp, map, mapSimultaneous, withCondition, ifVar } from 'karabiner.ts';
import { APP_REGEXES } from '../utils/app-names';

/**
 * Slack Navigation - Vim-style
 *
 * Provides vim-like navigation in Slack for efficient messaging.
 * Uses a 'g' prefix for special navigation (similar to vim's gg for top)
 */

/**
 * Global Slack Vim Mode Exit
 * This rule is NOT app-specific so you can exit vim mode from any app
 */
export const slackVimModeExit = rule('Slack Vim Mode Exit (Global)').manipulators([
  withCondition(ifVar('slack_vim_mode', 1))([
    withCondition(ifVar('slack_g', 0))([
      map('escape').toVar('slack_vim_mode', 0).toRemoveNotificationMessage('slack_vim'),
    ]),
  ]),
]);

/**
 * Slack Vim Navigation
 *
 * VIM MODE TOGGLE:
 * - Press j+k simultaneously to enter Vim Mode
 * - Press escape to exit Vim Mode
 * - A notification shows when Vim Mode is active
 *
 * When in Vim Mode:
 *
 * Basic navigation:
 * - j/k: Move down/up between messages
 * - h: Go back/exit thread (Cmd+[)
 * - l: Enter thread (arrow right)
 * - Ctrl+u: Page up
 * - Ctrl+d: Page down
 *
 * Jump to messages:
 * - gg: Jump to oldest message (Home)
 * - G (Shift+g): Jump to newest message (End)
 * - u: Jump to first unread (Cmd+J)
 *
 * Quick actions:
 * - Space: Quick switcher / Open channel (Cmd+K)
 * - /: Start search (Cmd+F)
 * - n: Find next
 * - N (Shift+n): Find previous
 *
 * Message actions:
 * - r: Reply in thread
 * - e: Edit message
 * - a: Add reaction
 * - m: Mark as unread (Option+Click equivalent)
 * - t: Open thread in sidebar
 *
 * View switching:
 * - gh: Go home (Cmd+Shift+H)
 * - gu: Go to unreads view (Cmd+Shift+A)
 * - gd: Go to DMs / All DMs (Cmd+Shift+K)
 * - gt: Go to threads (Cmd+Shift+T)
 * - gs: Go to saved items (Cmd+Shift+S)
 * - gm: Go to mentions (Cmd+Shift+M)
 * - gf: Toggle sidebar (Cmd+Shift+D)
 *
 * Sections:
 * - Tab: Next section (Cmd+F6)
 * - Shift+Tab: Previous section (Cmd+Shift+F6)
 */
export const slackNavigation = rule('Slack Vim Navigation', ifApp('^com\\.tinyspeck\\.slackmacgap$')).manipulators([
  /**
   * Vim Mode Toggle
   * Press j+k simultaneously to enter vim mode
   */
  withCondition(ifVar('slack_vim_mode', 0))([
    mapSimultaneous(['j', 'k'], undefined, 50)
      .toVar('slack_vim_mode', 1)
      .toNotificationMessage('slack_vim', '💬 Slack Vim Mode: ON (ESC to exit)'),
  ]),

  /**
   * G-prefix navigation mode (MUST BE BEFORE VIM MODE for priority)
   * Press 'g' to activate, then another key for the action
   * These work even when vim mode is OFF
   */

  // Activate g-mode
  withCondition(ifVar('slack_g', 0))([map('g').toVar('slack_g', 1)]),

  // G-mode actions
  withCondition(ifVar('slack_g', 1))([
    // gg - Jump to oldest message (like vim)
    map('g')
      .to('home') // Home = oldest message
      .toVar('slack_g', 0),

    // gh - Go home
    map('h')
      .to('h', ['command', 'shift']) // Cmd+Shift+H = Go to Home
      .toVar('slack_g', 0),

    // gu - Go to unreads view
    map('u')
      .to('a', ['command', 'shift']) // Cmd+Shift+A = Unreads
      .toVar('slack_g', 0),

    // gd - Go to DMs / All DMs view (Cmd+Shift+K)
    map('d')
      .to('k', ['command', 'shift']) // Cmd+Shift+K = All DMs view
      .toVar('slack_g', 0),

    // gt - Go to threads
    map('t')
      .to('t', ['command', 'shift']) // Cmd+Shift+T = Threads
      .toVar('slack_g', 0),

    // gs - Go to saved items
    map('s')
      .to('s', ['command', 'shift']) // Cmd+Shift+S = Saved items
      .toVar('slack_g', 0),

    // gm - Go to mentions & reactions
    map('m')
      .to('m', ['command', 'shift']) // Cmd+Shift+M = Mentions
      .toVar('slack_g', 0),

    // gf - Toggle file browser (sidebar)
    map('f')
      .to('d', ['command', 'shift']) // Cmd+Shift+D = Toggle sidebar
      .toVar('slack_g', 0),

    // Escape g-mode
    map('escape').toVar('slack_g', 0),
  ]),

  /**
   * Vim Mode Commands
   * Only active when slack_vim_mode = 1 AND NOT in g-mode
   */
  withCondition(ifVar('slack_vim_mode', 1))([
    withCondition(ifVar('slack_g', 0))([
      // Basic vim motions
      map('j').to('down_arrow'), // Next message
      map('k').to('up_arrow'), // Previous message
      map('h').to('open_bracket', 'command'), // Go back (Cmd+[ = back in Slack)
      map('l').to('right_arrow'), // Enter thread / expand

      // Page navigation (vim Ctrl+d / Ctrl+u)
      map('d', 'control').to('page_down'), // Page down
      map('u', 'control').to('page_up'), // Page up

      // Jump commands
      map('g', 'shift').to('end'), // G = Jump to newest message (End)
      map('u').to('j', 'command'), // Jump to first unread (Cmd+J)

      // Quick switcher
      map('spacebar').to('k', 'command'), // Quick switcher (Cmd+K)

      // Search
      map('slash').to('f', 'command'), // Start search (Cmd+F)
      map('n').to('g', 'command'), // Find next
      map('n', 'shift').to('g', ['command', 'shift']), // Find previous (N)

      // Message actions
      map('r').to('t', 'command'), // Reply in thread (Cmd+Shift+T opens thread)
      map('e').to('up_arrow'), // Edit last message (up arrow)
      map('a').to('r', ['command', 'shift']), // Add reaction (Cmd+Shift+R)
      map('m').to('m', 'option'), // Mark as unread (Option+M)
      map('t').to('t', ['command', 'shift']), // Open threads view

      // Section navigation
      map('tab').to('f6', 'command'), // Next section (Cmd+F6)
      map('tab', 'shift').to('f6', ['command', 'shift']), // Previous section (Cmd+Shift+F6)

      // Additional useful mappings
      map('o').to('return_or_enter'), // Open conversation (like vim's o for open)
      map('i').to('c', 'command'), // Insert/compose new message field (Cmd+C focuses compose)
      map('p').to('p', ['command', 'shift']), // Preferences (Cmd+,)

      // Vim-like operations
      map('y').to('c', 'command'), // Yank/Copy (Cmd+C)
      map('v').to('v', 'command'), // Visual/Paste (Cmd+V)
      map('z', 'shift').to('z', 'command'), // Undo (Z)
    ]),
  ]),
]);

