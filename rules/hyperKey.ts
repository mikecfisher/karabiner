import { KarabinerRules } from "../types";

const generalBundleIdentifiers = ["!^com\\.microsoft\\.VSCode$"]; // Applies to all except VS Code

export const hyperKey: KarabinerRules = {
  description: "Hyper Key (⌃⌥⇧⌘) except in VS Code VIM",
  manipulators: [
    {
      description: "Caps Lock -> Hyper Key",
      conditions: [
        {
          bundle_identifiers: generalBundleIdentifiers,
          type: "frontmost_application_unless",
        },
      ],
      from: {
        key_code: "caps_lock",
        modifiers: {
          optional: ["any"],
        },
      },
      to: [
        {
          set_variable: {
            name: "hyper",
            value: 1,
          },
        },
      ],
      to_after_key_up: [
        {
          set_variable: {
            name: "hyper",
            value: 0,
          },
        },
      ],
      to_if_alone: [
        {
          key_code: "escape",
        },
      ],
      type: "basic",
    },
  ],
};
