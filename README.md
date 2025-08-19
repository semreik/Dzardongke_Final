# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Features

- Flashcard study flow with progress tracking
- Offline Dzardzongke ⇄ English dictionary with fuzzy search
- Audio pronunciations for Dzongkha words
- Image-based animal vocabulary flashcards
- Detailed language explanations for grammar and vocabulary

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Study Decks and Flashcards

The app includes a flashcard system for learning vocabulary and phrases. These are organized in JSON files that can be easily extended.

### Deck Structure

Decks are stored in `/assets/decks/` as JSON files with the following structure:

```json
{
  "id": "unique-deck-id",
  "title": "Deck Title",
  "description": "Description of what this deck teaches",
  "cards": [
    {
      "id": "card-unique-id",
      "front": "Content for front of card (text or image filename)",
      "back": "Content for back of card",
      "notes": "Additional explanations or context",
      "image": "optional-image-filename.png",
      "hasAudio": false
    }
  ]
}
```

### Adding Image-Based Cards

To create cards with images on the front:

1. **Add your image files** to `/assets/images/animals/` or another appropriate subdirectory
2. **Register the images** in the `imageMap` in `/app/components/Card.tsx`:
   ```typescript
   const imageMap: Record<string, ImageSourcePropType> = {
     'existing-image.png': require('../../assets/images/animals/existing-image.png'),
     'your-new-image.png': require('../../assets/images/animals/your-new-image.png'),
   };
   ```
3. **Reference the image** in your card's `front` field:
   ```json
   {
     "id": "animal-example",
     "front": "your-new-image.png",
     "back": "Word in Dzardzongke",
     "notes": "Detailed explanation",
     "image": "your-new-image.png",
     "hasAudio": false
   }
   ```

### Creating Effective Notes

The `notes` field supports newline characters (`\n`) for formatting. For language learning cards, we recommend this structure:

```
English translation

word1 = meaning
word2 = meaning
word3 = meaning

Grammatical notes or patterns
```

Example:
```json
"notes": "White dog\n\nkyi = dog\nkaru = white (color)\ncik = a/an (indefinite article)\n\nWord order in Dzardzongke: noun + adjective + article"
```

### Creating a New Deck

1. Create a new JSON file in `/assets/decks/` (e.g., `colors.json`)
2. Follow the deck structure format above
3. Add your cards with appropriate content
4. Register the deck in `/app/screens/DeckList.tsx` by importing it and adding it to the `decks` array

### Best Practices

- Use consistent naming conventions for deck and card IDs
- Keep notes concise but informative
- For language learning, include grammatical patterns and word-by-word translations
- Group related content into themed decks
- Use the celebration card pattern at the end of each deck to summarize what was learned

## Audio Pronunciations

The dictionary includes support for audio pronunciations of Dzongkha words. Here's how to manage audio files:

### Adding Audio Files

1. **Prepare your audio file**:
   - Record or obtain an MP3 file of the word's pronunciation
   - Keep files small (under 100KB) for better app performance
   - Use 128kbps quality for a good balance between size and quality

2. **Name your audio file**:
   - Use the Dzongkha word as the filename (e.g., `go.mp3` for the word "go")
   - For words with spaces, replace spaces with underscores (e.g., `go_tsukken.mp3`)

3. **Add the file to the project**:
   - Place the MP3 file in the `/assets/audio/` directory

4. **Update the dictionary entry**:
   - Open `/assets/dictionary/dzardzongke.dict.json`
   - Find the entry for your word
   - Add an `audio` field with the filename:
     ```json
     {
       "dz": "go",
       "en": "door",
       "example": "",
       "exampleEn": "",
       "audio": "go.mp3"
     }
     ```

5. **Register the audio file**:
   - Open `/app/services/AudioService.ts`
   - Uncomment and update the `audioMap` to include your new audio file:
     ```typescript
     const audioMap: Record<string, any> = {
       'go.mp3': require('../../assets/audio/go.mp3'),
       'your_new_file.mp3': require('../../assets/audio/your_new_file.mp3'),
     };
     ```

### Removing Audio Files

1. **Remove the audio field** from the dictionary entry in `dzardzongke.dict.json`
2. **Remove the file reference** from the `audioMap` in `AudioService.ts`
3. **Delete the audio file** from the `/assets/audio/` directory

### Batch Processing

For adding multiple audio files at once:

1. Place all MP3 files in the `/assets/audio/` directory
2. Update all corresponding dictionary entries with the `audio` field
3. Register all files in the `audioMap` in `AudioService.ts`

For more detailed instructions, see the [Audio Pronunciations Guide](./docs/AUDIO_PRONUNCIATIONS.md).

## Culture Images

The guided Culture section (Dzardzongkha) displays photos alongside text and quizzes.

- Place Culture images under: `assets/images/culture/`
- Part a expects the file: `assets/images/culture/culture1.png`
- If you change the filename or path, update the `require(...)` in `app/screens/Culture.tsx` accordingly.
- Recommended: landscape image, at least 1600px wide; `.jpg` or `.png`.

## Dictionary Structure

The Dzardzongke dictionary is stored in `/assets/dictionary/dzardzongke.dict.json` with the following structure for each entry:

```json
{
  "dz": "Dzardzongke word",
  "en": "English translation",
  "example": "Example sentence in Dzardzongke",
  "exampleEn": "Example translation in English",
  "audio": "optional-audio-file.mp3"
}
```

### Adding New Dictionary Entries

1. Open `/assets/dictionary/dzardzongke.dict.json`
2. Add your new entry following the structure above
3. Entries should be alphabetically sorted by the `dz` field
4. If adding audio, follow the audio pronunciation instructions above

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
