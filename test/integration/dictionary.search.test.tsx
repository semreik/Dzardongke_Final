import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Dictionary } from '../../app/screens/Dictionary';

describe('Dictionary Screen', () => {
  it('searches for a word', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <NavigationContainer>
        <Dictionary />
      </NavigationContainer>
    );
    const input = getByPlaceholderText('Type a word…');
    fireEvent.changeText(input, 'bird');
    await waitFor(() => expect(getByText('བྱ་')).toBeTruthy());
    fireEvent.changeText(input, '');
    await waitFor(() => expect(queryByText('བྱ་')).toBeNull());
    expect(getByText('Type a word…')).toBeTruthy();
  });
});
