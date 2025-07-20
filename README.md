# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Features

- Flashcard study flow with progress tracking
- Offline Dzardzongke ⇄ English dictionary with fuzzy search
- Audio pronunciations for Dzongkha words

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

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
