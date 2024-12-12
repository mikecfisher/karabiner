import { rule, hyperLayer, writeToProfile, ifApp } from 'karabiner.ts';
import { map, toApp, to$, toKey } from 'karabiner.ts';

const codeEditors = ifApp([
  '^com\\.microsoft\\.VSCode$', // VS Code
  '^com\\.todesktop\\.230313mzl4w4u92$', // Cursor
  '^dev\\.zed\\.Zed$', // Zed
]);

writeToProfile(
  'Default',
  [
    // First define the hyper key (caps lock → hyper)
    rule('Caps Lock → Hyper').manipulators([map('caps_lock').toHyper().toIfAlone('caps_lock')]),

    // Lexicon Vim Navigation
    rule('Lexicon Vim Navigation', ifApp('^com\\.rekord\\.cloud\\.lexicon$')).manipulators([
      map('j', '⌘').to('down_arrow'),
      map('k', '⌘').to('up_arrow'),
      map('h', '⌘').to('left_arrow'),
      map('l', '⌘').to('right_arrow'),
    ]),

    // Vim-style navigation for code editors
    rule('Code Editor Vim Navigation', codeEditors).manipulators([
      // Half-page scrolling
      map('d', ['left_shift', 'left_command', 'left_control', 'left_option']).to('d', ['control']),
      map('u', ['left_shift', 'left_command', 'left_control', 'left_option']).to('u', ['control']),
    ]),

    // Browser shortcuts layer
    hyperLayer('b', 'browser-shortcuts').manipulators([
      map('g').to$("open 'https://google.com'"),
      map('t').to$("open 'https://twitter.com'"),
      map('y').to$("open 'https://news.ycombinator.com'"),
      map('f').to$("open 'https://facebook.com'"),
      map('r').to$("open 'https://reddit.com'"),
    ]),

    // Application launcher layer
    hyperLayer('o', 'open-apps').manipulators([
      map('1').toApp('1Password'),
      map('a').toApp('Akiflow'),
      map('b').toApp('Arc'),
      map('c').toApp('Cursor'),
      map('d').toApp('Discord'),
      map('e').toApp('Superhuman'),
      map('f').toApp('Finder'),
      map('g').toApp('Google Chrome'),
      map('h').toApp('Figma'),
      map('i').toApp('ChatGPT'),
      map('m').toApp('Texts'),
      map('n').toApp('Notion'),
      map('p').toApp('Spotify'),
      map('r').toApp('Reflect'),
      map('s').toApp('Slack'),
      map('t').toApp('Warp'),
      map('v').toApp('Visual Studio Code'),
      map('x').toApp('Lexicon'),
      map('z').toApp('Zed'),
    ]),

    // Window management layer
    hyperLayer('w', 'window-management').manipulators([
      map('semicolon').to('h', ['right_command']),
      map('u').to('tab', ['right_control', 'right_shift']),
      map('i').to('tab', ['right_control']),
      map('b').to('open_bracket', ['right_command']),
      map('n').to('close_bracket', ['right_command']),
      map('c').to$("open 'raycast://extensions/window-management/center-half'"),
      map('k').to$("open 'raycast://extensions/window-management/top-half'"),
      map('j').to$("open 'raycast://extensions/window-management/bottom-half'"),
      map('h').to$("open 'raycast://extensions/window-management/left-half'"),
      map('l').to$("open 'raycast://extensions/window-management/right-half'"),
      map('f').to$("open 'raycast://extensions/window-management/maximize'"),
      map('r').to$("open 'raycast://extensions/customWindowManagementCommand?name=React%20Native%20Dev'"),
    ]),

    // System controls layer
    hyperLayer('s', 'system-controls').manipulators([
      map('l').to('q', ['right_control', 'right_command']),
      map('e').to('spacebar', ['right_control', 'right_command']),
      map('d').to$("open 'raycast://extensions/do-not-disturb/toggle'"),
    ]),

    // Movement layer
    hyperLayer('v', 'movement').manipulators([
      map('h').to('left_arrow'),
      map('j').to('down_arrow'),
      map('k').to('up_arrow'),
      map('l').to('right_arrow'),
      map('m').to('f', ['right_control']),
      map('s').to('j', ['right_control']),
      map('d').to('d', ['right_shift', 'right_command']),
      map('u').to('page_down'),
      map('i').to('page_up'),
    ]),

    // Music controls layer
    hyperLayer('c', 'music-controls').manipulators([
      map('p').to('play_or_pause'),
      map('n').to('fastforward'),
      map('b').to('rewind'),
    ]),

    // Raycast layer
    hyperLayer('r', 'raycast-commands').manipulators([
      map('c').to$("open 'raycast://extensions/system/open-camera'"),
      map('e').to$("open 'raycast://extensions/emoji-symbols/search-emoji-symbols'"),
      map('g').to$("open 'raycast://extensions/google-search/index'"),
      map('h').to$("open 'raycast://extensions/clipboard-history/clipboard-history'"),
      map('i').to$("open 'raycast://extensions/raycast/raycast-ai/ai-chat'"),
      map('n').to$("open 'raycast://extensions/script-commands/dismiss-notifications'"),
      map('p').to$("open 'raycast://extensions/raycast/confetti'"),
    ]),
  ],
  {
    'basic.simultaneous_threshold_milliseconds': 50,
  }
);
