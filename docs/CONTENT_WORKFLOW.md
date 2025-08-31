# Content Workflow

This project stores flashcard decks, dictionary entries, and culture text in **Google Sheets** to make it easy for non‑developers to update content.

## Prerequisites

1. Create three Google Sheets (or three tabs in one spreadsheet):
   - **Decks** – columns such as `id`, `title`, `description`, `cardId`, `front`, `back`, etc.
   - **Dictionary** – columns `dz`, `en`, `example`, `exampleEn`, and optional `audio`.
   - **Culture** – columns that describe culture steps (e.g. `type`, `text`, `src`, `caption`).
2. Share each sheet so it is readable with an API key.
3. Note each spreadsheet’s ID (the long string in the sheet URL).

Set the following environment variables:

```bash
export GOOGLE_API_KEY="<your api key>"
export DECKS_SHEET_ID="<spreadsheet id for decks>"
export DICTIONARY_SHEET_ID="<spreadsheet id for dictionary>"
export CULTURE_SHEET_ID="<spreadsheet id for culture>"
```

## Exporting Content

Run the export script to pull the latest data and write JSON files under `assets/`:

```bash
npm run export-content
```

This creates or replaces:

- `assets/decks/decks.json`
- `assets/dictionary/dzardzongke.dict.json`
- `assets/culture/culture.json`

## Workflow Summary

1. Edit content in the appropriate Google Sheet.
2. Run `npm run export-content` to sync sheets to local JSON.
3. Review the files under `assets/` and commit them with your changes.

Generated JSON files are bundled with the app, so any update requires running the export script and committing the results.
