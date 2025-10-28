import { hyperLayer, map } from 'karabiner.ts';

import { RAYCAST, URLS, APP_NAMES } from '../constants';
import { toOpenChatGPTAtlas } from '../utils/utils';

// Browser shortcuts layer
export const browserShortcuts = hyperLayer('b', 'browser-shortcuts').manipulators([
  map('g').to$(URLS.GITHUB),
  map('t').to$(URLS.TWITTER),
  map('h').to$(URLS.HACKER_NEWS),
  map('f').to$(URLS.FACEBOOK),
  map('r').to$(URLS.REDDIT),
  map('p').to$(URLS.PERPLEXITY),
  map('y').to$(URLS.YOUTUBE),
  map('l').to$(URLS.LINKEDIN),
  map('c').to$(URLS.CHATGPT),
]);

// Application launcher layer
export const openApps = hyperLayer('o', 'open-apps').manipulators([
  map('1').toApp(APP_NAMES.PASSWORD_MANAGER),
  map('a').toApp(APP_NAMES.AKIFLOW),
  map('b').to(toOpenChatGPTAtlas),
  map('c').toApp(APP_NAMES.CURSOR),
  map('d').toApp(APP_NAMES.DISCORD),
  map('e').toApp(APP_NAMES.SUPERHUMAN),
  map('f').toApp(APP_NAMES.FINDER),
  map('g').toApp(APP_NAMES.CHROME),
  map('h').toApp(APP_NAMES.FIGMA),
  map('i').toApp(APP_NAMES.CHATGPT),
  map('m').toApp(APP_NAMES.BEEPER),
  map('n').toApp(APP_NAMES.NOTION),
  map('p').toApp(APP_NAMES.SPOTIFY),
  map('r').toApp(APP_NAMES.REFLECT),
  map('s').toApp(APP_NAMES.SLACK),
  map('t').toApp(APP_NAMES.GHOSTTY),
  map('v').toApp(APP_NAMES.VSCODE),
  map('x').toApp(APP_NAMES.LEXICON),
  map('z').toApp(APP_NAMES.ZED),
]);

// Window management layer
export const windowManagement = hyperLayer('w', 'window-management').manipulators([
  map('semicolon').to('h', ['right_command']),
  map('u').to('tab', ['right_control', 'right_shift']),
  map('i').to('tab', ['right_control']),
  map('b').to('open_bracket', ['right_command']),
  map('n').to('close_bracket', ['right_command']),
  map('c').to$(RAYCAST.WINDOW.CENTER),
  map('k').to$(RAYCAST.WINDOW.TOP),
  map('j').to$(RAYCAST.WINDOW.BOTTOM),
  map('h').to$(RAYCAST.WINDOW.LEFT),
  map('l').to$(RAYCAST.WINDOW.RIGHT),
  map('f').to$(RAYCAST.WINDOW.MAXIMIZE),
  map('r').to$(RAYCAST.WINDOW.CUSTOM(RAYCAST.WINDOW_LAYOUTS.REACT_NATIVE)),
]);

// System controls layer
export const systemControls = hyperLayer('s', 'system-controls').manipulators([
  map('l').to('q', ['right_control', 'right_command']),
  map('e').to('spacebar', ['right_control', 'right_command']),
  map('d').to$(RAYCAST.SYSTEM.DO_NOT_DISTURB),
]);

// Movement layer
export const movement = hyperLayer('v', 'movement').manipulators([
  map('h').to('left_arrow'),
  map('j').to('down_arrow'),
  map('k').to('up_arrow'),
  map('l').to('right_arrow'),
  map('m').to('f', ['right_control']),
  map('s').to('j', ['right_control']),
  map('d').to('d', ['right_shift', 'right_command']),
  map('u').to('page_down'),
  map('i').to('page_up'),
]);

// Music controls layer
export const musicControls = hyperLayer('c', 'music-controls').manipulators([
  map('p').to('play_or_pause'),
  map('n').to('fastforward'),
  map('b').to('rewind'),
]);

// Raycast layer
export const raycastCommands = hyperLayer('r', 'raycast-commands').manipulators([
  map('c').to$(RAYCAST.SYSTEM.CAMERA),
  map('e').to$(RAYCAST.SYSTEM.EMOJI_SEARCH),
  map('g').to$(RAYCAST.SYSTEM.GOOGLE_SEARCH),
  map('h').to$(RAYCAST.SYSTEM.CLIPBOARD_HISTORY),
  map('i').to$(RAYCAST.SYSTEM.AI_CHAT),
  map('n').to$(RAYCAST.SYSTEM.DISMISS_NOTIFICATIONS),
  map('p').to$(RAYCAST.SYSTEM.CONFETTI),
]);
