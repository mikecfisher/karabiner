import { rule, ifApp, map } from 'karabiner.ts';

export const lexiconVim = rule(
  'Remap Command+JKHL to Arrows for Lexicon App',
  ifApp(['^com\\.rekord\\.cloud\\.lexicon$'])
).manipulators([
  map('j', '⌘').to('down_arrow'),
  map('k', '⌘').to('up_arrow'),
  map('h', '⌘').to('left_arrow'),
  map('l', '⌘').to('right_arrow'),
]);
