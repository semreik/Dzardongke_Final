export type RootStackParamList = {
  DeckList: undefined;
  Study: {
    deckId: string;
    cards: Card[];
    deckTitle: string;
  };
  Stats: undefined;
  Dictionary: {
    word: string;
  };
  Congrats: {
    deckTitle: string;
    totalCards: number;
    masteredCards: number;
  };
};
