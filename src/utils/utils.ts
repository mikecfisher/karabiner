import { map } from 'karabiner.ts';

/** Back/Forward history in most apps. */
export function historyNavi() {
  return [
    map('h', ['control', 'option']).to('[', '⌘'), // Back
    map('l', ['control', 'option'], 'command').to(']', '⌘'), // Forward
  ];
}

/** Previous/Next tab in most apps. */
export function tabNavi() {
  return [
    map('h', 'control').to('[', '⌘⇧'), // Previous tab
    map('l', 'control').to(']', '⌘⇧'), // Next tab
  ];
}

/** Previous/Next switcher in most apps. */
export function switcher() {
  return [
    map('h', '⌘⌥⌃').to('⇥', '⌃⇧'), // Previous item
    map('l', '⌘⌥⌃').to('⇥', '⌃'), // Next item
  ];
}

/** Clear all system notifications */
export const toClearNotifications = {
  shell_command: `osascript -e '\\
tell application "System Events"
  try
    repeat
      set _groups to groups of UI element 1 of scroll area 1 of group 1 of window "Notification Center" of application process "NotificationCenter"
      set numGroups to number of _groups
      if numGroups = 0 then
        exit repeat
      end if
      repeat with _group in _groups
        set _actions to actions of _group
        set actionPerformed to false
        repeat with _action in _actions
          if description of _action is in {"Clear All", "Close"} then
            perform _action
            set actionPerformed to true
            exit repeat
          end if
        end repeat
        if actionPerformed then
          exit repeat
        end if
      end repeat
    end repeat
  end try
end tell'`,
};

/** Open ChatGPT Atlas using file path (works better than bundle_identifier for this app) */
export const toOpenChatGPTAtlas = {
  software_function: {
    open_application: {
      file_path: '/Applications/ChatGPT Atlas.app',
    },
  },
};
