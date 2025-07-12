# Dictionary Management Guide

The dictionary feature uses a JSON file located at `assets/dictionary/dzardzongke.dict.json`. You can easily add, remove, or modify dictionary entries by editing this file.

## File Structure

```json
{
  "entries": [
    {
      "dz": "བྱ་",          // Dzardzongke word
      "en": "bird",        // English translation
      "example": "བྱ་ཆེན་པོ་གཅིག་ནམ་མཁར་འཕུར་གི་འདུག",  // Example sentence in Dzardzongke
      "exampleEn": "A big bird is flying in the sky"  // English translation of example
    }
  ]
}
```

## How to Add New Words

1. Open `assets/dictionary/dzardzongke.dict.json`
2. Add a new entry to the `entries` array following the structure above
3. Make sure to include:
   - `dz`: The Dzardzongke word
   - `en`: The English translation
   - `example`: (Optional) An example sentence in Dzardzongke
   - `exampleEn`: (Optional) English translation of the example sentence

## Example Entry

```json
{
  "dz": "ཆུ་",
  "en": "water",
  "example": "ཆུ་འདི་གཙང་མ་འདུག",
  "exampleEn": "This water is clean"
}
```

## Important Notes

1. Maintain proper JSON formatting
2. Each entry must have at least `dz` and `en` fields
3. `example` and `exampleEn` fields are optional but recommended
4. The app uses fuzzy search, so users can find words even with slight misspellings
5. Changes to the dictionary file will be reflected after restarting the app

## Best Practices

1. Keep entries alphabetically sorted by the `en` field for easier maintenance
2. Include practical, commonly used example sentences
3. Verify the correctness of Dzardzongke text and translations
4. Back up the dictionary file before making large changes
