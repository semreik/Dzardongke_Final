import type { Deck } from '../types/deck';
import type { ConversationsData } from '../types/conversation';

import dzDictionary from '../../assets/dictionary/dzardzongke.dict.json';
import dzConversations from '../../assets/conversations/conversations.json';
import quDictionary from '../../assets/dictionary/qu.dict.json';
import quConversations from '../../assets/conversations/qu-conversations.json';
import quAnimals from '../../assets/decks/qu-animals-basic.json';
import quColors from '../../assets/decks/qu-colors-basic.json';
import quNumbers from '../../assets/decks/qu-numbers-basic.json';
import animalsDeck from '../../assets/decks/animals-basic.json';
import colorsDeck from '../../assets/decks/colors-basic.json';
import numbersDeck from '../../assets/decks/numbers-basic.json';

export type LanguageCode = 'dz' | 'qu';

type DictionaryShape = {
  entries: Array<{
    dz?: string;
    en?: string;
    example?: string;
    exampleEn?: string;
    audio?: string;
    // Optional image filename for this dictionary item (e.g., 'dog.png').
    // Put the file under assets/images/quiz and register it in quizImageMap below.
    image?: string;
  }>;
};

type ContentBundle = {
  decks: Deck[];
  dictionary: DictionaryShape;
  conversations: ConversationsData;
};

export const contentRegistry: Record<LanguageCode, ContentBundle> = {
  dz: {
    decks: [animalsDeck as Deck, colorsDeck as Deck, numbersDeck as Deck],
    dictionary: dzDictionary as unknown as DictionaryShape,
    conversations: dzConversations as ConversationsData,
  },
  qu: {
    decks: [quAnimals as Deck, quColors as Deck, quNumbers as Deck],
    dictionary: quDictionary as unknown as DictionaryShape,
    conversations: quConversations as ConversationsData,
  },
};

export const nsDeckId = (lang: LanguageCode, deckId: string) => `${lang}:${deckId}`;

// Quiz image registry
// You can map either prompt strings (lowercased) or explicit image filenames
// to statically imported images. Add your images to assets/images/quiz and
// register them here.
const reactLogo = require('../../assets/images/react-logo.png');

const quizImageMap: Record<LanguageCode, {
  byPrompt: Record<string, any>;
  byName: Record<string, any>;
}> = {
  dz: {
    byPrompt: {
      dog: reactLogo,
      bird: reactLogo,
      fish: reactLogo,
    },
    byName: {
      'placeholder.png': reactLogo,
    },
  },
  qu: {
    byPrompt: {
      dog: reactLogo,
      bird: reactLogo,
      fish: reactLogo,
    },
    byName: {
      'placeholder.png': reactLogo,
    },
  },
};

export function getQuizImageForPrompt(lang: LanguageCode, prompt?: string) {
  if (!prompt) return undefined;
  const key = String(prompt).toLowerCase().trim();
  return quizImageMap[lang]?.byPrompt[key];
}

export function getQuizImageByName(lang: LanguageCode, imageName?: string) {
  if (!imageName) return undefined;
  return quizImageMap[lang]?.byName[imageName];
}


