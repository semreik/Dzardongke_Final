import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Card as CardType } from '../types/deck';

interface Props {
  card: CardType;
  isFlipped: boolean;
  onFlip: () => void;
}

export const Card: React.FC<Props> = ({ card, isFlipped, onFlip }) => {
  return (
    <TouchableOpacity onPress={onFlip} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>{isFlipped ? card.back : card.front}</Text>
        {card.hasAudio && (
          <Ionicons name="volume-high" size={24} color="#666" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 200,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
});
