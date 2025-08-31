import type { ConversationsData } from '../types/conversation';
import type { Deck } from '../types/deck';

import dzConversations from '../../assets/conversations/conversations.json';
import quConversations from '../../assets/conversations/qu-conversations.json';
import animalsDeck from '../../assets/decks/animals-basic.json';
import colorsDeck from '../../assets/decks/colors-basic.json';
import numbersDeck from '../../assets/decks/numbers-basic.json';
import quAnimals from '../../assets/decks/qu-animals-basic.json';
import quColors from '../../assets/decks/qu-colors-basic.json';
import quNumbers from '../../assets/decks/qu-numbers-basic.json';
import dzDictionary from '../../assets/dictionary/dzardzongke.dict.json';
import quDictionary from '../../assets/dictionary/qu.dict.json';

export type LanguageCode = 'dz' | 'qu';

type DictionaryShape = {
  entries: Array<{
    dz?: string;
    en?: string;
    example?: string;
    exampleEn?: string;
    audio?: string;
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
// Map prompt strings (lowercased) to statically imported images.
// Add your images under assets/images (or a subfolder) and register them here.
const reactLogo = require('../../assets/images/react-logo.png');

const baseQuizImageMap: Record<string, any> = {
  // animals / common nouns
  dog: reactLogo,
  bird: reactLogo,
  fish: reactLogo,
  horse: reactLogo,
  cat: reactLogo,
  cow: reactLogo,
  yak: reactLogo,
  water: reactLogo,
  money: reactLogo,
  house: reactLogo,
  sun: reactLogo,
  moon: reactLogo,
  flask: reactLogo,
  // colours
  white: reactLogo,
  yellow: reactLogo,
  black: reactLogo,
  green: reactLogo,
  brown: reactLogo,
  blue: reactLogo,
  red: reactLogo,
  // numbers (if used as prompts)
  one: reactLogo,
  two: reactLogo,
  three: reactLogo,
  four: reactLogo,
  five: reactLogo,
  six: reactLogo,
  seven: reactLogo,
  eight: reactLogo,
  nine: reactLogo,
  ten: reactLogo,
};

const quizImageMap: Record<LanguageCode, { byPrompt: Record<string, any> }> = {
  dz: { byPrompt: baseQuizImageMap },
  qu: { byPrompt: baseQuizImageMap },
};

export function getQuizImageForPrompt(lang: LanguageCode, prompt?: string) {
  if (!prompt) return undefined;
  const key = String(prompt).toLowerCase().trim();
  return quizImageMap[lang]?.byPrompt[key];
}


