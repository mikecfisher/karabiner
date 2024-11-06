/**
 * Code Editor-Specific Hyper Key Behaviors
 *
 * This module defines special behaviors for the Hyper key when used in code editors.
 * It currently supports Cursor, VS Code, and Zed editors.
 *
 * Special mappings:
 * - Hyper + D -> Control + D (for scrolling down half-page in Vim mode)
 * - Hyper + U -> Control + U (for scrolling up half-page in Vim mode)
 *
 * These mappings allow for Vim-style navigation while maintaining the Hyper key's
 * functionality for other shortcuts. The mappings only activate when:
 * 1. One of the supported code editors is the active window
 * 2. The hyper variable is set to 1 (Caps Lock is being held)
 */

import { KarabinerRules } from "../types";

const codeEditorIdentifiers = [
  "^com\\.todesktop\\.230313mzl4w4u92$",
  "^com\\.microsoft\\.VSCode$",
  "^dev\\.zed\\.Zed$",
];

export const hyperKeyInCodeEditors: KarabinerRules = {
  description: "Hyper Key (⌃⌥⇧⌘) in code editors",
  manipulators: [
    {
      description: "Hyper + D -> Control + D in code editors",
      conditions: [
        {
          bundle_identifiers: codeEditorIdentifiers,
          type: "frontmost_application_if",
        },
        {
          type: "variable_if",
          name: "hyper",
          value: 1,
        },
      ],
      from: {
        key_code: "d",
        modifiers: {
          optional: ["any"],
        },
      },
      to: [
        {
          key_code: "d",
          modifiers: ["left_control"],
        },
      ],
      type: "basic",
    },
    {
      description: "Hyper + U -> Control + U in code editors",
      conditions: [
        {
          bundle_identifiers: codeEditorIdentifiers,
          type: "frontmost_application_if",
        },
        {
          type: "variable_if",
          name: "hyper",
          value: 1,
        },
      ],
      from: {
        key_code: "u",
        modifiers: {
          optional: ["any"],
        },
      },
      to: [
        {
          key_code: "u",
          modifiers: ["left_control"],
        },
      ],
      type: "basic",
    },
  ],
};
