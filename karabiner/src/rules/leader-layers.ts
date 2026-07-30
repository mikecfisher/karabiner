import {
  ifExpression,
  ifVar,
  map,
  mapSimultaneous,
  rule,
  to$,
  toApp,
  toKey,
  toPaste,
  toRemoveNotificationMessage,
  toSetVarExpression,
  toUnsetVar,
  type FromKeyParam,
  type ToEvent,
  withCondition,
} from 'karabiner.ts';

import { RAYCAST, URLS } from '../constants';
import { APP_NAMES } from '../utils/app-names';
import { generateEmojiNotificationText, generateEmojiManipulators } from '../utils/emoji-helpers';
import { generateMenuNotificationText, menuCategories } from '../utils/notification-menu';
import { toClearNotifications, toOpenChatGPTAtlas } from '../utils/utils';

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
 *ARC
 **/

// Window keys that step through several sizes on repeated presses. Each key owns a
// `cycle_<key>` counter, and listing them here is what keeps the counters and the
// resets in exitLeader() from drifting apart.
const windowCycles: Array<[FromKeyParam, ToEvent[]]> = [
  ['c', [to$(RAYCAST.WINDOW.CENTER), to$(RAYCAST.WINDOW.CENTER_TWO_THIRDS), to$(RAYCAST.WINDOW.MAXIMIZE)]],
  ['f', [to$(RAYCAST.WINDOW.MAXIMIZE), to$(RAYCAST.WINDOW.ALMOST_MAXIMIZE), to$(RAYCAST.WINDOW.RESTORE)]],
];

// Helper function to exit leader mode; also clears the cycle counters so every leader
// session starts each cycle at its first position
export const exitLeader = () => [
  toUnsetVar('leader'),
  ...windowCycles.map(([key]) => toUnsetVar(`cycle_${key}`)),
  toRemoveNotificationMessage('leader'),
];

// Helper function to map a key with an action and exit leader mode
const leaderAction = (key: FromKeyParam, action: ToEvent | ToEvent[]) => map(key).to(action).to(exitLeader());

// Map a key to cycle through actions on repeated presses. Stays in leader mode while
// cycling; auto-exits after 500ms without a keypress (any other key cancels the timer,
// and those keys exit leader mode themselves).
// Uses KE 15.6 expressions: an undefined counter evaluates to 0, and each press increments it.
const cycleAction = (key: FromKeyParam, actions: ToEvent[]) =>
  actions.map((action, i) =>
    map(key)
      .condition(ifExpression(`cycle_${key} % ${actions.length} == ${i}`))
      .to(action)
      .to(toSetVarExpression(`cycle_${key}`, { expression: `cycle_${key} + 1` }))
      .toDelayedAction(exitLeader(), [])
      .parameters({ 'basic.to_delayed_action_delay_milliseconds': 500 })
  );

// Repeat the same action while keeping leader mode open. Raycast's directional
// half-window commands handle their own 1/2 → 2/3 → 1/3 size cycling.
const repeatAction = (key: FromKeyParam, action: ToEvent | ToEvent[]) =>
  map(key)
    .to(action)
    .toDelayedAction(exitLeader(), [])
    .parameters({ 'basic.to_delayed_action_delay_milliseconds': 500 });

// Get emoji notification text and manipulators
const emojiNotificationText = generateEmojiNotificationText();
const emojiManipulators = generateEmojiManipulators(leaderAction);
const leaderKeys = ['.', '/'] as FromKeyParam[];

// Leader Key configuration
export const leaderKey = rule('Leader Key').manipulators([
  /**
   * Stage 0: Activate Leader Mode
   *
   * When 'l' and ';' are pressed simultaneously AND the 'leader' variable is 0 (inactive),
   * set the 'leader' variable to 1 (active) and show a notification with available categories.
   */
  withCondition(ifVar('leader', 0))([
    mapSimultaneous([...leaderKeys], undefined, 250)
      .toVar('leader', 1)
      .toNotificationMessage(
        'leader',
        '(A)pps (I)AI (R)aycast (W)indow (B)rowser (S)ystem (E)moji (C)ode (N)otifications'
      ),
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
    leaderAction('1', toApp(APP_NAMES.PASSWORD_MANAGER)),
    leaderAction('a', toApp(APP_NAMES.AKIFLOW)),
    leaderAction('b', toOpenChatGPTAtlas),
    leaderAction('c', toApp(APP_NAMES.CURSOR)),
    leaderAction('d', toApp(APP_NAMES.DISCORD)),
    leaderAction('e', toApp(APP_NAMES.SUPERHUMAN)),
    leaderAction('f', toApp(APP_NAMES.FINDER)),
    leaderAction('g', toApp(APP_NAMES.CHROME)),
    leaderAction('i', toApp(APP_NAMES.CHATGPT)),
    // 'm' now opens a sub-menu for messaging apps
    map('m').toVar('leader', 'apps_messages').toNotificationMessage('leader', '(M)essages (W)hatsApp (B)eeper'),
    leaderAction('n', toApp(APP_NAMES.NOTION)),
    leaderAction('o', toApp(APP_NAMES.IOS_SIMULATOR)),
    leaderAction('r', toApp(APP_NAMES.REFLECT)),
    leaderAction('s', toApp(APP_NAMES.SLACK)),
    leaderAction('t', toApp(APP_NAMES.CMUX)),
    leaderAction('v', toApp(APP_NAMES.VSCODE)),
    leaderAction('w', toApp(APP_NAMES.TEAMS)),
    leaderAction('x', toApp(APP_NAMES.LEXICON)),
    leaderAction('y', toApp(APP_NAMES.FIGMA)),
    leaderAction('z', toApp(APP_NAMES.ZED)),
  ]),

  /**
   * AI Category Actions
   *
   * When the 'leader' variable is 'ai' and an action key is pressed,
   * launch the corresponding AI desktop app and exit leader mode.
   */
  withCondition(ifVar('leader', 'ai'))([
    leaderAction('c', toApp(APP_NAMES.CLAUDE)),
    leaderAction('g', toApp(APP_NAMES.CHATGPT)),
  ]),

  /**
   * Apps > Messages Sub-menu
   *
   * When the 'leader' variable is 'apps_messages' and an action key is pressed,
   * launch the corresponding messaging application and exit leader mode.
   */
  withCondition(ifVar('leader', 'apps_messages'))([
    leaderAction('m', toApp(APP_NAMES.MESSAGES)),
    leaderAction('w', toApp(APP_NAMES.WHATSAPP)),
    leaderAction('b', toApp(APP_NAMES.BEEPER)),
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
    // c cycles center → wide center → fullscreen, f cycles maximize → almost → restore,
    // both on repeated presses without leaving leader mode
    ...windowCycles.flatMap(([key, actions]) => cycleAction(key, actions)),
    leaderAction('w', to$(RAYCAST.WINDOW.CENTER_TWO_THIRDS)),
    repeatAction('h', to$(RAYCAST.WINDOW.LEFT)),
    repeatAction('j', to$(RAYCAST.WINDOW.BOTTOM)),
    repeatAction('k', to$(RAYCAST.WINDOW.TOP)),
    repeatAction('l', to$(RAYCAST.WINDOW.RIGHT)),
    leaderAction('[', to$(RAYCAST.WINDOW.PREVIOUS_DISPLAY)),
    leaderAction(']', to$(RAYCAST.WINDOW.NEXT_DISPLAY)),
    leaderAction('hyphen', to$(RAYCAST.WINDOW.PREVIOUS_DESKTOP)),
    leaderAction('equal_sign', to$(RAYCAST.WINDOW.NEXT_DESKTOP)),
  ]),

  /**
   * Browser Shortcuts Category Actions
   *
   * When the 'leader' variable is 'browser' and an action key is pressed,
   * open the corresponding website and exit leader mode.
   */
  withCondition(ifVar('leader', 'browser'))([
    leaderAction('c', to$(URLS.CHATGPT)),
    leaderAction('g', to$(URLS.GITHUB)),
    leaderAction('h', to$(URLS.HACKER_NEWS)),
    leaderAction('l', to$(URLS.LINKEDIN)),
    leaderAction('r', to$(URLS.REDDIT)),
    leaderAction('t', to$(URLS.TWITTER)),
    leaderAction('y', to$(URLS.YOUTUBE)),
  ]),

  /**
   * System Controls Category Actions
   *
   * When the 'leader' variable is 'system' and an action key is pressed,
   * perform the corresponding system action and exit leader mode.
   */
  withCondition(ifVar('leader', 'system'))([
    leaderAction('d', toKey('d', ['left_command', 'left_option', 'left_control'])), // Toggle DND

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
