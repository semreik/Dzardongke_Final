# Quiz Images Guide

You can show an optional illustration for multiple-choice quiz items. The UI scales images automatically.

## TL;DR
- Put your image under `assets/images/` (e.g., `assets/images/quiz/horse.png`).
- Map an English prompt to an image in `app/services/contentRegistry.ts` under `quizImageMap.byPrompt` for the corresponding language.
- Build/run locally; the image will show on the quiz card for that prompt.

## Steps
1) Add your image file
- Recommended path: `assets/images/quiz/`
- Filename rule: lowercase, hyphen-separated (e.g., `horse.png`, `two-birds.png`)
- Recommended format: PNG or WebP
- Recommended size: square, around 256–512 px (optimize size < 100KB when possible)

2) Register the mapping
- Open `app/services/contentRegistry.ts`
- Inside `quizImageMap`, add a prompt→image mapping:
```ts
// Example (English prompt is the left-hand side of the quiz card)
const horsePng = require('../../assets/images/quiz/horse.png');

const quizImageMap = {
  dz: {
    byPrompt: {
      horse: horsePng,
      // other prompts...
    },
  },
  qu: {
    byPrompt: {
      horse: horsePng,
    },
  },
};
```
- Keys are compared in lowercase; ensure your prompt text matches.

3) Verify in the app
- Run locally; open the Multiple Choice screen and navigate until the prompt appears.
- The image should appear under the prompt card with proper containment.

## Notes
- Images are optional. If no mapping exists, the quiz renders without an image.
- You can map the same image for both `dz` and `qu` prompts as needed.
- Keep images lightweight for mobile performance.

