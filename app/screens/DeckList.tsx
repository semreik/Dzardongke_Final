import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Deck } from '../types/deck';
import { ProgressBar } from '../components/ProgressBar';
import { useProgress } from '../stores/useProgress';

// Import decks
import animalsDeck from '../../assets/decks/animals-basic.json';
import colorsDeck from '../../assets/decks/colors-basic.json';
import foodDeck from '../../assets/decks/food-basic.json';
import greetingsDeck from '../../assets/decks/phrases-greetings.json';

const decks: Deck[] = [animalsDeck, colorsDeck, foodDeck, greetingsDeck];

export const DeckList: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const getDeckProgress = useProgress(state => state.getDeckProgress);

  const renderItem = ({ item: deck }: { item: Deck }) => (
    <TouchableOpacity
      style={styles.deckItem}
      onPress={() => navigation.navigate('Study', { deckId: deck.id, cards: deck.cards })}
    >
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.description}>{deck.description}</Text>
      <View style={styles.progressContainer}>
        <ProgressBar progress={getDeckProgress(deck.id, deck.cards)} />
        <Text style={styles.cardCount}>{deck.cards.length} cards</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={decks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  deckItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardCount: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
});
