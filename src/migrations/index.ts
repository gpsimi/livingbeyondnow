import * as migration_20260206_111706_initial from './20260206_111706_initial';

export const migrations = [
  {
    up: migration_20260206_111706_initial.up,
    down: migration_20260206_111706_initial.down,
    name: '20260206_111706_initial'
  },
];
