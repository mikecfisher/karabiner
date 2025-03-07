import { writeToProfile } from 'karabiner.ts';

import { leaderKey } from './rules/leader-layers';
import { lexiconVim } from './rules/lexicon-vim';
import { capsLockToControl } from './utils/keyboard-mappings';

writeToProfile(
  'Default',
  [
    capsLockToControl(),

    // Leader Key approach
    leaderKey,

    // Lexicon Vim Navigation
    lexiconVim,
  ],
  {
    'basic.simultaneous_threshold_milliseconds': 50,
  }
);
