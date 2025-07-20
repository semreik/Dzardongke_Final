# Adding Audio Pronunciations to Dictionary Entries

This guide explains how to add audio pronunciations to the Dzongkha dictionary entries.

## Audio File Requirements

- **Format**: MP3 format is recommended
- **File Size**: Keep files small (under 100KB if possible) for better app performance
- **Quality**: 128kbps is a good balance between quality and file size
- **Naming Convention**: The filename should match the `audio` field in the dictionary entry

## Adding New Audio Pronunciations

### Step 1: Prepare Your Audio File

1. Record or obtain an audio file of the Dzongkha word pronunciation
2. Convert it to MP3 format if necessary
3. Name the file according to the convention (e.g., `go.mp3` for the word "go")
4. For words with spaces, replace spaces with underscores (e.g., `go_tsukken.mp3`)

### Step 2: Add the Audio File to the Project

1. Place the audio file in the `/assets/audio/` directory

### Step 3: Update the Dictionary Entry

Update the corresponding dictionary entry in `/assets/dictionary/dzardzongke.dict.json` to include the audio field:

```json
{
  "dz": "go",
  "en": "door",
  "example": "",
  "exampleEn": "",
  "audio": "go.mp3"
}
```

### Step 4: Register the Audio File in AudioService

Update the `audioMap` in `/app/services/AudioService.ts` to include your new audio file:

```typescript
const audioMap: Record<string, any> = {
  'go.mp3': require('../../assets/audio/go.mp3'),
  'your_new_file.mp3': require('../../assets/audio/your_new_file.mp3'),
  // Add more audio files as they become available
};
```

### Step 5: Test the Audio Pronunciation

1. Rebuild and restart the app
2. Navigate to the dictionary
3. Search for the word you added audio for
4. Tap the sound button next to the word to hear the pronunciation

## Batch Adding Audio Files

For adding multiple audio files at once, follow the same process but make sure to:

1. Add all audio files to the `/assets/audio/` directory
2. Update all corresponding dictionary entries with the `audio` field
3. Register all new audio files in the `audioMap` in `AudioService.ts`

## Troubleshooting

- If the audio doesn't play, check that the filename in the dictionary entry matches exactly with the audio file name
- Ensure the audio file is properly registered in the `audioMap`
- Verify that the audio file is in MP3 format and placed in the correct directory
