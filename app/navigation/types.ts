import type { Card } from '../types/deck';
import type { ConversationCategory, Conversation } from '../types/conversation';

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
  NumbersWrite: {
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
  ConversationCategories: undefined;
  ConversationList: {
    categoryId: string;
    title: string;
  };
  ConversationPractice: {
    categoryId: string;
    conversationId: string;
    title: string;
  };
};
