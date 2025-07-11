import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useProgress } from '../../app/stores/useProgress';
import { Study } from '../../app/screens/Study';
import { Stats } from '../../app/screens/Stats';
import animalsDeck from '../../assets/decks/animals-basic.json';

const Stack = createStackNavigator();
const TestNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Study" 
      component={Study}
      initialParams={{
        deckId: animalsDeck.id,
        cards: animalsDeck.cards,
        deckTitle: animalsDeck.title
      }}
    />
    <Stack.Screen name="Stats" component={Stats} />
  </Stack.Navigator>
);

// Reset store between tests
beforeEach(() => {
  const store = useProgress.getState();
  store.loadProgress();
});

describe('Progress Flow', () => {
  it('updates mastered count in Stats after marking all cards as mastered', async () => {
    const { getByText, findByText } = render(
      <NavigationContainer>
        <TestNavigator />
      </NavigationContainer>
    );

    // Wait for Study screen to render
    await findByText(/card 1 of/i);

    // Mark each card as mastered
    for (let i = 0; i < animalsDeck.cards.length; i++) {
      await waitFor(() => {
        const gotItButton = getByText('Got it');
        fireEvent.press(gotItButton);
      });
    }

    // Verify the progress is updated in the store
    await waitFor(() => {
      const store = useProgress.getState();
      const progress = store.progress[animalsDeck.id];
      expect(Object.values(progress).every(p => p.status === 'mastered')).toBe(true);
    });

    // Verify mastered count in Stats
    await waitFor(() => {
      const expectedText = `${animalsDeck.cards.length} / ${animalsDeck.cards.length} mastered`;
      expect(getByText(expectedText)).toBeTruthy();
    });
  });
});
