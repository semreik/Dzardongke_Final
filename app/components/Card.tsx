import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Card as CardType } from '../types/deck';
import imageRegistry from '../services/imageRegistry';

interface Props {
  card: CardType;
  isFlipped: boolean;
  onFlip: () => void;
}

// Map of color names to their CSS color values (keys are lowercase for case-insensitive match)
const colorMap: Record<string, string> = {
  'white': '#FFFFFF',
  'yellow': '#FFEB3B',
  'black': '#212121',
  'green': '#4CAF50',
  'brown': '#795548',
  'blue': '#2196F3',
  'red': '#F44336',
  'gray': '#9E9E9E',
  'grey': '#9E9E9E'
};

export const Card: React.FC<Props> = ({ card, isFlipped, onFlip }) => {
  // Check if the front content is an image filename
  const isFrontImage = card.front && typeof card.front === 'string' && card.front.endsWith('.png');
  
  // Check if the image exists in the generated image registry
  const imageExists = isFrontImage && imageRegistry[card.front as string] !== undefined;
  
  // Check if this is a color card by checking if the front matches a color name (case-insensitive)
  // For color cards, we'll use the front (English) color name to determine the background color
  // regardless of whether the card is flipped or not
  const frontKey = typeof card.front === 'string' ? (card.front as string).toLowerCase() : '';
  const isColorCard = typeof card.front === 'string' && colorMap[frontKey] !== undefined;
  const cardBackgroundColor = isColorCard ? colorMap[frontKey] : undefined;
  
  // For dark background colors, use white text
  const isDarkColor = cardBackgroundColor === colorMap['black'] || cardBackgroundColor === colorMap['blue'] || 
                      cardBackgroundColor === colorMap['brown'] || cardBackgroundColor === colorMap['green'] || 
                      cardBackgroundColor === colorMap['red'];
  
  const formatDisplayText = (text: unknown): string => {
    const s = typeof text === 'string' ? text : '';
    // For animal cards, render phrases in lowercase per requirement
    if (card.id && typeof card.id === 'string' && card.id.startsWith('animal-')) {
      return s.toLowerCase();
    }
    return s;
  };

  return (
    <TouchableOpacity 
      onPress={onFlip} 
      style={[styles.container, cardBackgroundColor ? { backgroundColor: cardBackgroundColor } : null]}
    >
      <View style={styles.content}>
        {!isFlipped && imageExists ? (
          <Image 
            source={imageRegistry[card.front as string]}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Text style={[styles.text, isDarkColor ? styles.lightText : null]}>
            {isFlipped ? formatDisplayText(card.back) : (imageExists ? '' : formatDisplayText(card.front))}
          </Text>
        )}
        {isFlipped && card.notes && (
          <Text style={[styles.notes, isDarkColor ? styles.lightText : null]}>{card.notes}</Text>
        )}
        {card.hasAudio && (
          <Ionicons name="volume-high" size={24} color="#666" style={styles.audioIcon} />
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
    color: '#000000',
  },
  lightText: {
    color: '#FFFFFF',
  },
  notes: {
    fontSize: 16,
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
    alignSelf: 'stretch',
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  audioIcon: {
    marginTop: 10,
  },
});
