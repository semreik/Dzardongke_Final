import type { CultureDeck } from './types';

export const loadCulture = (language: string): CultureDeck[] => {
  switch (language) {
    case 'dz':
      return [
        require('../../assets/culture/dz/deck-1.json'),
        require('../../assets/culture/dz/deck-2.json'),
      ] as CultureDeck[];
    default:
      return [];
  }
};
