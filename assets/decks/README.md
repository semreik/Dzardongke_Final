# Dzardzongke Flashcard Decks

This directory contains JSON files defining flashcard decks for the Dzardzongke language learning app.

## Adding or Editing Decks

1. Each deck is a separate JSON file following the schema in `deck.schema.json`
2. File naming convention: `{category}-{level}.json` (e.g., `colors-basic.json`)
3. Required fields:
   - `id`: Unique identifier matching the filename (e.g., "colors-basic")
   - `title`: Display name (e.g., "Basic Colors")
   - `description`: Brief explanation of the deck's content
   - `cards`: Array of flashcards

### Card Structure

Each card requires:
- `id`: Unique identifier within the deck (e.g., "c1", "food-1")
- `front`: Dzardzongke text
- `back`: English translation
- `hasAudio`: (optional) Boolean indicating if pronunciation audio exists

Example:
```json
{
  "id": "colors-basic",
  "title": "Basic Colors",
  "description": "Learn common color names in Dzardzongke",
  "cards": [
    {
      "id": "c1",
      "front": "མཐིང་",
      "back": "Blue",
      "hasAudio": true
    }
  ]
}
```

## Validation

Run `npx ajv-cli validate -s deck.schema.json -d "*.json"` in this directory to validate all deck files against the schema.

## Guidelines

1. Keep decks focused and manageable (8-15 cards recommended)
2. Group related concepts together
3. Use clear, consistent translations
4. Test all new decks in the app before committing
