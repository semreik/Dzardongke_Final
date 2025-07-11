export type RootStackParamList = {
  DeckList: undefined;
  Study: {
    deckId: string;
    cards: Card[];
    deckTitle: string;
  };
  Stats: undefined;
  Dictionary: undefined;
  Congrats: {
    deckTitle: string;
    totalCards: number;
    masteredCards: number;
  };
};
