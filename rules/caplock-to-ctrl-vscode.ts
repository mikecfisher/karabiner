import { KarabinerRules } from "../types";

const vsCodeIdentifier = "^com\\.microsoft\\.VSCode$"; // VS Code's bundle identifier

export const capsLockAsControlInVSCode: KarabinerRules = {
  description: "Caps Lock as Ctrl in VS Code",
  manipulators: [
    {
      description: "Caps Lock -> Control",
      conditions: [
        {
          bundle_identifiers: [vsCodeIdentifier],
          type: "frontmost_application_if",
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
          key_code: "left_control",
        },
      ],
      type: "basic",
    },
  ],
};
