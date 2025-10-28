import { writeToProfile } from 'karabiner.ts';

import { browserNavigation, leaderKey } from './rules/leader-layers';
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

    // Browser Navigation
    browserNavigation,
  ],
  {
    'basic.simultaneous_threshold_milliseconds': 50,
  }
);
