# Adding Culture Content (Non-technical Guide)

This guide explains how to add new Culture content (texts, images, quizzes) without touching any screen code.
All UI wiring is automatic.

## Where to edit

- Images folder: `assets/images/Culture/`
- Content file: `app/content/culture.dz.ts`

You only edit those two places.

## Image rules

- Put PNG or JPG files in `assets/images/Culture/` (e.g., `culture10.png`).
- Use short, simple filenames (no spaces).
- Keep landscape images for a better look (recommended width ≥ 1600px).

## Content structure

The content file exports two “decks” (tabs):
- Deck 1: Dzardzongkha: Language & Region
- Deck 2: Dachang festival

Each deck has a list of steps. A step can be:
- `text`: a paragraph card
- `image`: an image with a caption
- `quiz-single`: a multiple-choice quiz with one correct answer
- `quiz-multi`: a multiple-choice quiz with multiple correct answers

## Example: add a new text + image + quiz

Open `app/content/culture.dz.ts` and add to the proper deck’s `steps` array:

```ts
steps: [
  { type: 'text', text: 'Write your new paragraph here.' },
  { type: 'image', src: 'culture10.png', caption: 'Your caption text' },
  { type: 'quiz-single', question: 'Your question?', options: [
    { label: 'Option A', correct: false },
    { label: 'Option B', correct: true },
  ]},
]
```

Make sure `culture10.png` exists under `assets/images/Culture/`.

## Showing/hiding correct answers

- Quizzes hide correctness until you press “Check answer(s)”.
- For multi-select quizzes, select multiple options and press “Check answers”.

## Do I need a backend?

No. Culture content is bundled with the app (local files). No network or API is required.
If in the future you want server-driven content, we can keep the same schema and fetch it from a URL—no UI changes needed.

## Tips

- Keep paragraphs separate for better pacing (one paragraph = one step).
- Keep captions short but informative.
- Prefer consistent filenames: `culture<number>.png`.

## Troubleshooting

- Image not showing? Confirm the file path: `assets/images/Culture/<filename>` and that `src` in the content matches the filename exactly (including capitalization).
- Build cache issues: restart the dev server with `npx expo start -c`.


