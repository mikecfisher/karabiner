import { KarabinerRules, KeyCode, Manipulator } from "../types";

const bundleIdentifiers = ["^com\\.rekord\\.cloud\\.lexicon$"];

const commandModifier = ["command"];
const optionalModifiers = ["any"];

const keys: Record<string, KeyCode> = {
  j: "down_arrow",
  k: "up_arrow",
  h: "left_arrow",
  l: "right_arrow",
};

const manipulators: Manipulator[] = Object.entries(keys).map(
  ([fromKey, toKey]) => ({
    conditions: [
      {
        bundle_identifiers: bundleIdentifiers,
        type: "frontmost_application_if",
      },
    ],
    from: {
      key_code: fromKey as KeyCode,
      modifiers: {
        mandatory: commandModifier,
        optional: optionalModifiers,
      },
    },
    to: [
      {
        key_code: toKey,
      },
    ],
    type: "basic",
  })
);

export const lexiconVim: KarabinerRules = {
  description: "Remap Command+JKHL to Arrows for Lexicon App",
  manipulators: manipulators,
};
