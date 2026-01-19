import { rule, ifApp } from 'karabiner.ts';

import { APP_REGEXES } from '../utils/app-names';
import { historyNavi, tabNavi, switcher } from '../utils/utils';

/**
 * Browser Navigation
 *
 * Adds navigation shortcuts for browsers:
 * - Ctrl+h/l: Back/Forward
 * - Alt+h/l: Previous/Next tab
 * - Hyper+h/l: Window switching
 */
export const browserNavigation = rule(
  'Browser Navigation',
  ifApp([
    APP_REGEXES.ARC,
    APP_REGEXES.SAFARI,
    APP_REGEXES.CHROME,
    APP_REGEXES.ZEN,
    APP_REGEXES.BRAVE,
    APP_REGEXES.CHATGPT_ATLAS,
  ])
).manipulators([
  ...historyNavi(), // shift+option+h/l for back/forward
  ...tabNavi(), // ctrl+h/l for previous/next tab
  ...switcher(), // Hyper+h/l for window switching
]);
