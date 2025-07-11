import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { DeckList } from '../../app/screens/DeckList';
import { NavigationContainer } from '@react-navigation/native';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock progress store
jest.mock('../../app/stores/useProgress', () => ({
  useProgress: () => (deckId: string, cards: any[]) => 0,
}));

describe('DeckList', () => {
  it('displays all decks', () => {
    render(
      <NavigationContainer>
        <DeckList />
      </NavigationContainer>
    );
    
    // Check all deck titles are displayed
    expect(screen.getByText('Basic Animals')).toBeTruthy();
    expect(screen.getByText('Basic Colors')).toBeTruthy();
    expect(screen.getByText('Basic Food Items')).toBeTruthy();
    expect(screen.getByText('Basic Greetings')).toBeTruthy();
  });
});
