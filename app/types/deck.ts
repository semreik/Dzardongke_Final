export interface Card {
  id: string;
  front: string;
  back: string;
  hasAudio?: boolean;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  cards: Card[];
}
