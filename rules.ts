import fs from "fs";
import { KarabinerRules, Manipulator, KeyCode } from "./types";
import {
  createHyperSubLayers,
  app,
  open,
  rectangle,
  raycastWindow,
} from "./utils";
import { hyperKey } from "./rules/hyperKey";
import { lexiconVim } from "./rules/lexicon-vim";
import { capsLockAsControlInVSCode } from "./rules/caplock-to-ctrl-vscode";

const rules: KarabinerRules[] = [
  hyperKey,
  lexiconVim,
  capsLockAsControlInVSCode,
  ...createHyperSubLayers({
    b: {
      g: open("https://google.com"),
      t: open("https://twitter.com"),
      // Quarterly "P"lan
      // p: open("https://qrtr.ly/plan"),
      y: open("https://news.ycombinator.com"),
      f: open("https://facebook.com"),
      r: open("https://reddit.com"),
    },
    // o = "Open" applications
    o: {
      //   "raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink"
      // "i"Message
      // "M"essages
      // "W"hatsApp has been replaced by Texts
      // ),
      // a: app("iA Presenter"),
      // c: app("Notion Calendar"),
      // i: app("Texts"),
      // l: open(
      // Open todo list managed via *H*ypersonic
      // r: app("Texts"),
      // w: open("Texts"),
      1: app("1Password"),
      a: app("Ableton Live 12 Suite"),
      b: app("Arc"),
      c: app("Akiflow"),
      d: app("Discord"),
      e: app("Superhuman"),
      f: app("Finder"),
      g: app("Google Chrome"),
      m: app("Texts"),
      n: app("Notion"),
      p: app("Spotify"),
      r: app("Reflect"),
      s: app("Slack"),
      t: app("Warp"),
      v: app("Visual Studio Code"),
      x: app("Lexicon"),
      z: app("zoom.us"),
    },

    // w = "Window" via rectangle.app
    w: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      c: raycastWindow("center-two-thirds"),
      k: raycastWindow("top-half"),
      j: raycastWindow("bottom-half"),
      h: raycastWindow("left-half"),
      l: raycastWindow("right-half"),
      f: raycastWindow("maximize"),
    },

    // s = "System"
    s: {
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      e: {
        to: [
          {
            // Emoji picker
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      d: open(`raycast://extensions/yakitrak/do-not-disturb/toggle`),
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via homerow.app
      // m: {
      //   to: [{ key_code: "f", modifiers: ["right_control"] }],
      // },
      // // Scroll mode via homerow.app
      // s: {
      //   to: [{ key_code: "j", modifiers: ["right_control"] }],
      // },
      // d: {
      //   to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
      // },
      // u: {
      //   to: [{ key_code: "page_down" }],
      // },
      // i: {
      //   to: [{ key_code: "page_up" }],
      // },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // r = "Raycast"
    r: {
      n: open("raycast://script-commands/dismiss-notifications"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      g: open("raycast://extensions/mblode/google-search/index"),
      c: open("raycast://extensions/raycast/system/open-camera"),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
