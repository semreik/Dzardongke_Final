import type { Card } from '../types/deck';

export type RootStackParamList = {
  DeckList: undefined;
  Study: {
    deckId: string;
    cards: Card[];
    deckTitle: string;
  };
  Write: {
    deckId: string;
    cards: Card[];
    deckTitle: string;
  };
  Congrats: {
    deckTitle: string;
    totalCards: number;
    masteredCards: number;
  };
  Stats: undefined;
};
