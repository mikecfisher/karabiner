import { rule, writeToProfile, map } from 'karabiner.ts';

import { hyperKeyInCodeEditors } from './rules/hyper-key-in-code-editors';
import {
  browserShortcuts,
  openApps,
  windowManagement,
  systemControls,
  movement,
  musicControls,
  raycastCommands,
} from './rules/hyper-layers';
import { leaderKey } from './rules/leader-layers';
import { lexiconVim } from './rules/lexicon-vim';

writeToProfile(
  'Default',
  [
    // First define the hyper key (caps lock → hyper)
    rule('Caps Lock → Hyper').manipulators([map('caps_lock').toHyper().toIfAlone('caps_lock')]),

    // Leader Key approach
    leaderKey,

    // Lexicon Vim Navigation
    lexiconVim,

    // Hyper key in code editors
    hyperKeyInCodeEditors,

    // Hyper layers
    browserShortcuts,
    openApps,
    windowManagement,
    systemControls,
    movement,
    musicControls,
    raycastCommands,
  ],
  {
    'basic.simultaneous_threshold_milliseconds': 50,
  }
);
