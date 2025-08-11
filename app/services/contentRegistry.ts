import type { Deck } from '../types/deck';
import type { ConversationsData } from '../types/conversation';

import dzDictionary from '../../assets/dictionary/dzardzongke.dict.json';
import dzConversations from '../../assets/conversations/conversations.json';
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
    decks: [],
    dictionary: { entries: [] },
    conversations: { categories: [] },
  },
};

export const nsDeckId = (lang: LanguageCode, deckId: string) => `${lang}:${deckId}`;


