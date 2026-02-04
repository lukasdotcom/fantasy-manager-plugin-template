# Agent Guide: Fantasy Manager Plugin Template

This document helps AI coding agents understand and modify this repository effectively.

## Project Overview

This is a **template repository** for creating plugins for Fantasy Manager. Plugins fetch player and club data from external APIs and return it in a standardized format.

## Key Files & Directories

| Path                 | Purpose                                                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `plugin/index.ts`    | **Main plugin logic** – implements the data getter. This is the primary file to modify.                                                  |
| `plugin/Sample.json` | **Plugin manifest** – id, version, description, files list, input settings. Rename when creating a real plugin (e.g. `Bundesliga.json`). |
| `plugin/types.ts`    | **API response types** – define interfaces for your external API responses.                                                              |
| `main.ts`            | **Local test harness** – runs the plugin with mock data. Edit `config` to test settings.                                                 |
| `types/data.ts`      | **Core types** – `players`, `clubs`, `result`, `dataGetter`. Do not modify; these are the contract.                                      |
| `types/database.ts`  | Server-side types. **Do not import** – copy types if needed.                                                                             |
| `types/store.ts`     | Plugin store manifest types – reference for `Sample.json` structure.                                                                     |

## Path Aliases

The project uses TypeScript path aliases (see `tsconfig.json` and `package.json` imports):

- `#/*` → root `*.ts` files
- `#types/*` or `#type/*` → `types/*.ts`
- Use these for imports, e.g. `import { players } from "#type/data"`

## Plugin Contract

The plugin must export a default function with this signature:

```typescript
type dataGetter = (
  settings: { [key: string]: string },
  past_data: {
    players: players[];
    clubs: clubs[];
    timestamp: number;
    [key: string]: unknown;
  },
) => Promise<result>;
```

**Return value** `result` is a tuple: `[transfer_open, countdown, playerList, clubs, options?]`

- `transfer_open`: boolean
- `countdown`: number (seconds)
- `playerList`: `players[]` from `types/data.ts`
- `clubs`: `clubs[]` from `types/data.ts`
- `options`: optional object (e.g. `{ update_points_after_game_end: true }`)

## Common Modification Tasks

### Adding a new plugin from this template

1. Work inside `plugin/` – assume the repo is already set up for this plugin.
2. Update `Sample.json` → change `id`, `version`, `description`, `files` (raw GitHub URLs to plugin files; confirm URLs with the user if unsure).
3. Update `plugin/index.ts` to fetch from your API and map to `players`/`clubs`.
4. Define custom API response types in `plugin/types.ts` if needed.

### Changing plugin settings

1. Add entries to `input` in `Sample.json`
2. They appear in `settings` object passed to the data getter
3. Add corresponding keys to `config` in `main.ts` for local testing

### Modifying the data getter

1. Edit `plugin/index.ts`
2. Fetch data, map to `players` and `clubs` from `types/data.ts`
3. Return `[transfer_open, countdown, playerList, clubs]` (optionally with 5th element for settings)

## Validation & Commands

- **`npm test`** – TypeScript check, ESLint, Prettier. Run after changes.
- **`npm run format`** – Auto-format with Prettier
- **`npm start`** – Run `main.ts` to test the plugin locally

## Important Constraints

- **`types/data.ts`**: Defines the plugin contract. DO NOT EDIT.
- **`types/database.ts`**: Do not import. Use only as reference; copy types if needed.
- **`players`** and **`clubs`**: See `types/data.ts` for required/optional fields. `pictureUrl` is always empty when passed to the plugin.
- **Points**: `total`, `average`, `last_match` – see README "Note about total, average, and last_match points".

## File Naming

- Plugin manifest: typically `PluginName.json` (e.g. `Bundesliga.json`)
- Main entry: `index.ts` (required for plugin loading – do not rename)
