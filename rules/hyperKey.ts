/**
 * Global Hyper Key Configuration
 *
 * This module configures the Caps Lock key to act as a "Hyper Key" - a special modifier
 * that can be used for custom shortcuts throughout the system.
 *
 * Key behaviors:
 * - Caps Lock never functions as a traditional Caps Lock key
 * - When pressed alone: Acts as Escape key
 * - When held: Activates "hyper" mode (tracked via variable)
 * - Works consistently across all applications
 *
 * The hyper state is managed through a variable that other configurations can check,
 * allowing for application-specific behaviors when the hyper key is active.
 */

import { rule, map } from 'karabiner.ts';

export const hyperKey = rule('Hyper Key (⌃⌥⇧⌘)').manipulators([map('caps_lock').toHyper().toIfAlone('escape')]);
