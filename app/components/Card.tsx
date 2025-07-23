import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Card as CardType } from '../types/deck';

interface Props {
  card: CardType;
  isFlipped: boolean;
  onFlip: () => void;
}

export const Card: React.FC<Props> = ({ card, isFlipped, onFlip }) => {
  // Check if the front content is an image filename
  const isFrontImage = card.front && typeof card.front === 'string' && card.front.endsWith('.png');
  
  // Check if the image exists in our imageMap
  const imageExists = isFrontImage && imageMap[card.front as string] !== undefined;
  
  return (
    <TouchableOpacity onPress={onFlip} style={styles.container}>
      <View style={styles.content}>
        {!isFlipped && imageExists ? (
          <Image 
            source={imageMap[card.front as string]} 
            style={styles.image} 
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.text}>{isFlipped ? card.back : (imageExists ? '' : card.front)}</Text>
        )}
        {isFlipped && card.notes && (
          <Text style={styles.notes}>{card.notes}</Text>
        )}
        {card.hasAudio && (
          <Ionicons name="volume-high" size={24} color="#666" style={styles.audioIcon} />
        )}
      </View>
    </TouchableOpacity>
  );
};

// Map image filenames to require statements
const imageMap: Record<string, ImageSourcePropType> = {
  'white-dog.png': require('../../assets/images/animals/white-dog.png'),
  'two-frogs.png': require('../../assets/images/animals/two-frogs.png'),
  'black-birds.png': require('../../assets/images/animals/black-birds.png'),
  'turtles.png': require('../../assets/images/animals/turtles.png'),
  'monkeys.png': require('../../assets/images/animals/monkeys.png'),
  'foxes.png': require('../../assets/images/animals/foxes.png'),
  'birds.png': require('../../assets/images/animals/birds.png'),
  'fish.png': require('../../assets/images/animals/fish.png'),
  'butterflies.png': require('../../assets/images/animals/butterflies.png'),
  'bats.png': require('../../assets/images/animals/bats.png'),
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
