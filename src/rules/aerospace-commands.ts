import { rule, ifVar, withCondition, map, type FromKeyParam } from 'karabiner.ts';

import { exitLeader } from './leader-layers';

// Helper function with the correct absolute path
const aeroAction = (key: FromKeyParam | string[], command: string): ReturnType<typeof map> => {
  // Handle array format ['shift', 'h'] by extracting modifiers and key
  if (Array.isArray(key)) {
    const modifiers = key.slice(0, -1);
    const actualKey = key[key.length - 1] as FromKeyParam;

    // Convert modifiers to the format expected by map()
    // For shift, we use '⇧' which is the alias for shift
    const modifierStr = modifiers.includes('shift') ? '⇧' : '';

    return map(actualKey, modifierStr)
      .to({
        shell_command: `/opt/homebrew/bin/aerospace ${command}`,
      })
      .to(exitLeader());
  }

  // Handle regular key format
  return map(key)
    .to({
      shell_command: `/opt/homebrew/bin/aerospace ${command}`,
    })
    .to(exitLeader());
};

// AeroSpace commands category
export const aerospaceCommands = rule('AeroSpace Commands').manipulators([
  // Only active when leader is set to 'aerospace'
  withCondition(ifVar('leader', 'aerospace'))([
    // Layout commands
    aeroAction('s', 'layout stack'),
    aeroAction('f', 'layout floating'),

    // Window operations
    aeroAction('u', 'fullscreen'),
    aeroAction('z', 'balance-sizes'),

    // Focus commands
    aeroAction('h', 'focus left'),
    aeroAction('j', 'focus down'),
    aeroAction('k', 'focus up'),
    aeroAction('l', 'focus right'),

    // Move commands - using ['shift', 'h'] syntax
    aeroAction(['shift', 'h'], 'move left'),
    aeroAction(['shift', 'j'], 'move down'),
    aeroAction(['shift', 'k'], 'move up'),
    aeroAction(['shift', 'l'], 'move right'),

    // Workspace commands
    aeroAction('1', 'workspace 1'),
    aeroAction('2', 'workspace 2'),
    aeroAction('3', 'workspace 3'),
    aeroAction('4', 'workspace 4'),
    aeroAction('5', 'workspace 5'),
    aeroAction('b', 'workspace B'),
    aeroAction('c', 'workspace C'),
    aeroAction('t', 'workspace T'),

    // Move to workspace
    aeroAction(['shift', '1'], 'move-node-to-workspace 1'),
    aeroAction(['shift', '2'], 'move-node-to-workspace 2'),
    aeroAction(['shift', '3'], 'move-node-to-workspace 3'),
    aeroAction(['shift', '4'], 'move-node-to-workspace 4'),
    aeroAction(['shift', '5'], 'move-node-to-workspace 5'),
    aeroAction(['shift', 'b'], 'move-node-to-workspace B'),
    aeroAction(['shift', 'c'], 'move-node-to-workspace C'),
    aeroAction(['shift', 't'], 'move-node-to-workspace T'),

    // Toggle AeroSpace
    aeroAction('o', 'enable toggle'),

    // 3. Service mode essentials
    aeroAction('r', 'flatten-workspace-tree'), // Reset layout
    aeroAction('f', 'layout floating tiling'), // Float toggle

    // Add these common AeroSpace commands to match your config
    aeroAction('slash', 'layout tiles horizontal vertical'),
    aeroAction('comma', 'layout accordion horizontal vertical'),
    aeroAction('-', 'resize smart -50'),
    aeroAction('=', 'resize smart +50'),

    aeroAction('tab', 'workspace-back-and-forth'),

    // 3. Mirror .toml's monitor commands:
    aeroAction(['shift', 'tab'], 'move-workspace-to-monitor --wrap-around next'),
  ]),
]);
