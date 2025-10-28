import { rule, ifApp, map } from 'karabiner.ts';

import { APP_REGEXES } from '../constants';

export const lexiconVim = rule('Lexicon Vim Navigation', ifApp(APP_REGEXES.LEXICON)).manipulators([
  map('j', '⌘').to('down_arrow'),
  map('k', '⌘').to('up_arrow'),
  map('h', '⌘').to('left_arrow'),
  map('l', '⌘').to('right_arrow'),
]);
