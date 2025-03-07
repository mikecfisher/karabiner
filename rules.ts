import {
  rule,
  hyperLayer,
  writeToProfile,
  mapSimultaneous,
  ifVar,
  toNotificationMessage,
  toUnsetVar,
  toRemoveNotificationMessage,
  withCondition,
  map,
} from 'karabiner.ts';
import { RAYCAST, URLS, APP_NAMES } from './constants';
import { hyperKeyInCodeEditors } from './rules/hyper-key-in-code-editors';
import { lexiconVim } from './rules/lexicon-vim';
import { leaderKey } from './rules/leader-key';
import {
  browserShortcuts,
  openApps,
  windowManagement,
  systemControls,
  movement,
  musicControls,
  raycastCommands,
} from './rules/hyper-layers';

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
