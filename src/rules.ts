import { writeToProfile } from 'karabiner.ts';

import { browserNavigation } from './rules/browser-navigation';
import { finderNavigation, finderVimModeExit } from './rules/finder-navigation';
import { leaderKey } from './rules/leader-layers';
import { lexiconVim } from './rules/lexicon-vim';
import { slackNavigation, slackVimModeExit } from './rules/slack-navigation';
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

    // Finder Vim Navigation
    finderNavigation,

    // Global Finder Vim Mode Exit (works in any app)
    finderVimModeExit,

    // Slack Vim Navigation
    slackNavigation,

    // Global Slack Vim Mode Exit (works in any app)
    slackVimModeExit,
  ],
  {
    'basic.simultaneous_threshold_milliseconds': 50,
  }
);
