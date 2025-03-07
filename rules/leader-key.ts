import {
  rule,
  mapSimultaneous,
  ifVar,
  toNotificationMessage,
  toUnsetVar,
  toRemoveNotificationMessage,
  withCondition,
  map,
  to$,
  toApp,
  toKey,
  type ToEvent,
  type FromKeyParam,
  toPaste,
  ifApp,
} from 'karabiner.ts';
import { RAYCAST, URLS, APP_NAMES, APP_REGEXES } from '../constants';
import { historyNavi, tabNavi, switcher, toClearNotifications } from '../utils/utils';
import { generateEmojiNotificationText, generateEmojiManipulators } from '../utils/emoji-helpers';
import { generateMenuNotificationText } from '../utils/notification-menu';
import { menuCategories } from '../utils/notification-menu';

/**
 * Leader Key Implementation
 *
 * This module implements a "leader key" approach inspired by Vim's leader key concept.
 * Instead of using modifier keys (like Command, Option, etc.), it uses a sequence of keypresses:
 *
 * 1. First press 'l' + ';' simultaneously to activate leader mode
 * 2. Then press a category key (a/r/w/b/s) to select a submenu
 * 3. Finally press an action key to perform the desired action
 *
 * The implementation uses Karabiner-Elements variables to track the current state:
 * - leader = 0: Leader mode inactive (default state)
 * - leader = 1: Leader mode active, waiting for category selection
 * - leader = 'apps'/'raycast'/etc.: Category selected, waiting for action
 *
 * Visual feedback is provided through notifications at each step.
 * Pressing escape at any point exits leader mode.
 */

// Helper function to exit leader mode
const exitLeader = () => [toUnsetVar('leader'), toRemoveNotificationMessage('leader')];

// Helper function to map a key with an action and exit leader mode
const leaderAction = (key: FromKeyParam, action: ToEvent | ToEvent[]) => map(key).to(action).to(exitLeader());

// Get emoji notification text and manipulators
const emojiNotificationText = generateEmojiNotificationText();
const emojiManipulators = generateEmojiManipulators(leaderAction);

// Leader Key configuration
export const leaderKey = rule('Leader Key').manipulators([
  /**
   * Stage 0: Activate Leader Mode
   *
   * When 'l' and ';' are pressed simultaneously AND the 'leader' variable is 0 (inactive),
   * set the 'leader' variable to 1 (active) and show a notification with available categories.
   */
  withCondition(ifVar('leader', 0))([
    mapSimultaneous(['l', ';'], undefined, 250)
      .toVar('leader', 1)
      .toNotificationMessage('leader', '(A)pps (R)aycast (W)indow (B)rowser (S)ystem (E)moji (C)ode (N)otifications'),
  ]),

  /**
   * Exit Leader Mode
   *
   * When escape is pressed AND the 'leader' variable is NOT 0 (i.e., leader mode is active),
   * reset the 'leader' variable to 0 and remove the notification.
   */
  withCondition(ifVar('leader', 0).unless())([map('escape').to(exitLeader())]),

  /**
   * Stage 1: Select Category
   *
   * When the 'leader' variable is 1 (active) and a category key is pressed,
   * set the 'leader' variable to the selected category and show a notification
   * with available actions for that category.
   */
  withCondition(ifVar('leader', 1))([
    ...menuCategories.map(category =>
      map(category.key as FromKeyParam)
        .toVar('leader', category.varValue)
        .toNotificationMessage('leader', generateMenuNotificationText(category.options))
    ),
    map('e').toVar('leader', 'emoji').toNotificationMessage('leader', emojiNotificationText),
    map('n').to(toClearNotifications).to(exitLeader()),
  ]),
  // Apps submenu
  /**
   * Apps Category Actions
   *
   * When the 'leader' variable is 'apps' and an action key is pressed,
   * launch the corresponding application and exit leader mode.
   *
   * The leaderAction helper function handles both performing the action
   * and exiting leader mode in a single, reusable function.
   */
  withCondition(ifVar('leader', 'apps'))([
    leaderAction('a', toApp(APP_NAMES.AKIFLOW)),
    leaderAction('b', toApp(APP_NAMES.ARC)),
    leaderAction('c', toApp(APP_NAMES.CURSOR)),
    leaderAction('d', toApp(APP_NAMES.DISCORD)),
    leaderAction('f', toApp(APP_NAMES.FINDER)),
    leaderAction('g', toApp(APP_NAMES.CHROME)),
    leaderAction('i', toApp(APP_NAMES.CHATGPT)),
    leaderAction('n', toApp(APP_NAMES.NOTION)),
    leaderAction('s', toApp(APP_NAMES.SLACK)),
    leaderAction('t', toApp(APP_NAMES.GHOSTTY)),
    leaderAction('v', toApp(APP_NAMES.VSCODE)),
    leaderAction('z', toApp(APP_NAMES.ZED)),
  ]),

  /**
   * Raycast Category Actions
   *
   * When the 'leader' variable is 'raycast' and an action key is pressed,
   * execute the corresponding Raycast command and exit leader mode.
   */
  withCondition(ifVar('leader', 'raycast'))([
    leaderAction('c', to$(RAYCAST.SYSTEM.CAMERA)),
    leaderAction('e', to$(RAYCAST.SYSTEM.EMOJI_SEARCH)),
    leaderAction('g', to$(RAYCAST.SYSTEM.GOOGLE_SEARCH)),
    leaderAction('h', to$(RAYCAST.SYSTEM.CLIPBOARD_HISTORY)),
    leaderAction('i', to$(RAYCAST.SYSTEM.AI_CHAT)),
    leaderAction('n', to$(RAYCAST.SYSTEM.DISMISS_NOTIFICATIONS)),
    leaderAction('p', to$(RAYCAST.SYSTEM.CONFETTI)),
  ]),

  /**
   * Window Management Category Actions
   *
   * When the 'leader' variable is 'window' and an action key is pressed,
   * perform the corresponding window management action and exit leader mode.
   */
  withCondition(ifVar('leader', 'window'))([
    leaderAction('c', to$(RAYCAST.WINDOW.CENTER)),
    leaderAction('f', to$(RAYCAST.WINDOW.MAXIMIZE)),
    leaderAction('h', to$(RAYCAST.WINDOW.LEFT)),
    leaderAction('j', to$(RAYCAST.WINDOW.BOTTOM)),
    leaderAction('k', to$(RAYCAST.WINDOW.TOP)),
    leaderAction('l', to$(RAYCAST.WINDOW.RIGHT)),
  ]),

  /**
   * Browser Shortcuts Category Actions
   *
   * When the 'leader' variable is 'browser' and an action key is pressed,
   * open the corresponding website and exit leader mode.
   */
  withCondition(ifVar('leader', 'browser'))([
    leaderAction('g', to$(URLS.GITHUB)),
    leaderAction('t', to$(URLS.TWITTER)),
    leaderAction('h', to$(URLS.HACKER_NEWS)),
    leaderAction('r', to$(URLS.REDDIT)),
    leaderAction('y', to$(URLS.YOUTUBE)),
    leaderAction('c', to$(URLS.CHATGPT)),
  ]),

  /**
   * System Controls Category Actions
   *
   * When the 'leader' variable is 'system' and an action key is pressed,
   * perform the corresponding system action and exit leader mode.
   */
  withCondition(ifVar('leader', 'system'))([
    leaderAction('d', to$(RAYCAST.SYSTEM.DO_NOT_DISTURB)),
    leaderAction('l', toKey('q', ['right_control', 'right_command'])), // Lock screen
    leaderAction('e', toKey('spacebar', ['right_control', 'right_command'])), // Emoji picker
  ]),

  /**
   * Emoji Category Actions
   *
   * When the 'leader' variable is 'emoji' and an action key is pressed,
   * paste the corresponding emoji and exit leader mode.
   *
   * The emoji manipulators are generated from the emoji-helpers module.
   */
  withCondition(ifVar('leader', 'emoji'))([...emojiManipulators]),

  /**
   * Code Snippet Category Actions
   *
   * When the 'leader' variable is 'code' and an action key is pressed,
   * paste the corresponding code snippet and exit leader mode.
   */
  withCondition(ifVar('leader', 'code'))([
    leaderAction('l', toPaste('console.log();')), // Log
    leaderAction('f', toPaste('() => {}')), // Function
    leaderAction('i', toPaste('if () {}')), // If
    leaderAction('r', toPaste('return ')), // Return
    leaderAction('t', toPaste('this.')), // This
  ]),
]);

/**
 * Arc Browser Navigation
 *
 * Adds navigation shortcuts for Arc browser:
 * - Ctrl+h/l: Back/Forward
 * - Alt+h/l: Previous/Next tab
 * - Hyper+h/l: Window switching
 */
export const arcNavigation = rule('Arc Navigation', ifApp(APP_REGEXES.ARC)).manipulators([
  ...historyNavi(), // Ctrl+h/l for back/forward
  ...tabNavi(), // Alt+h/l for previous/next tab
  ...switcher(), // Hyper+h/l for window switching
]);
