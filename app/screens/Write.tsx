import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { Card } from '../types/deck';
import { useProgress } from '../stores/useProgress';

type RootStackParamList = {
  Write: { deckId: string; cards: Card[] };
};

interface Props {
  navigation: any;
  route: any;
}

export const Write: React.FC<Props> = ({ navigation, route }) => {
  const { deckId, cards } = route.params;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { setMastered } = useProgress();

  const currentCard = cards[currentCardIndex];
  const isCorrect = userInput.toLowerCase().trim() === currentCard.back.toLowerCase().trim();

  const handleCheck = () => {
    setShowResult(true);
    if (isCorrect) {
      setMastered(currentCard.id, true);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setUserInput('');
      setShowResult(false);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.front}>{currentCard.front}</Text>
      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Type the English translation..."
        onSubmitEditing={handleCheck}
        autoCapitalize="none"
        editable={!showResult}
      />
      {!showResult ? (
        <TouchableOpacity style={styles.button} onPress={handleCheck}>
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={[styles.result, isCorrect ? styles.correct : styles.incorrect]}>
            {isCorrect ? '✓ Correct!' : `✗ Incorrect. The answer is: ${currentCard.back}`}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {currentCardIndex < cards.length - 1 ? 'Next' : 'Finish'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.progress}>
        {currentCardIndex + 1} / {cards.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  front: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 16,
    fontSize: 18,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    width: '100%',
    gap: 16,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  correct: {
    color: '#34C759',
  },
  incorrect: {
    color: '#FF3B30',
  },
  progress: {
    position: 'absolute',
    bottom: 32,
    fontSize: 16,
    color: '#666',
  },
});
