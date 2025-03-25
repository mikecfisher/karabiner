import { rule, map, ifApp } from 'karabiner.ts';

import { APP_REGEXES } from '../constants';

export const capsLockToHyper = () =>
  rule('Caps Lock → Hyper').manipulators([map('caps_lock').toHyper().toIfAlone('caps_lock')]);

export const capsLockToControl = () =>
  rule('Caps Lock → Control/Escape').manipulators([
    // Use Hyper in Lexicon
    map('caps_lock').toHyper().toIfAlone('escape').condition(ifApp(APP_REGEXES.LEXICON)),

    // Use Control everywhere else with Escape on tap
    map('caps_lock').to('left_control').toIfAlone('escape').condition(ifApp(APP_REGEXES.LEXICON).unless()),
  ]);
