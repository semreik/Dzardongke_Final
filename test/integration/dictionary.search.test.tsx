import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Dictionary } from '../../app/screens/Dictionary';

describe('Dictionary Screen', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <Dictionary />
      </NavigationContainer>
    );
    expect(getByPlaceholderText('Search words...')).toBeTruthy();
  });
});
