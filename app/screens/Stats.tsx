import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { Deck } from '../types/deck';
import { ProgressBar } from '../components/ProgressBar';
import { useProgress } from '../stores/useProgress';
import { useLanguage } from '../stores/useLanguage';
import { contentRegistry, nsDeckId } from '../services/contentRegistry';

export const Stats: React.FC = () => {
  const { getDeckProgress, getSessionsByDeck, loadProgress } = useProgress();
  const { selectedLanguage } = useLanguage();
  const decks: Deck[] = contentRegistry[selectedLanguage].decks;

  useFocusEffect(
    React.useCallback(() => {
      loadProgress();
    }, [loadProgress])
  );

  const renderItem = ({ item: deck }: { item: Deck }) => {
    const namespacedId = nsDeckId(selectedLanguage, deck.id);
    const masteredCount = getDeckProgress(namespacedId, deck.cards);
    const progress = deck.cards.length ? masteredCount / deck.cards.length : 0;

    const sessions = getSessionsByDeck(namespacedId);
    const lastSession = sessions[sessions.length - 1];
    
    return (
      <View style={styles.deckItem}>
        <Text style={styles.title}>{deck.title}</Text>
        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} />
          <Text style={styles.progressText}>
            {masteredCount} / {deck.cards.length} mastered
          </Text>
        </View>
        
        {lastSession && (
          <View style={styles.sessionStats}>
            <Text style={styles.statsTitle}>Last Session</Text>
            <Text style={styles.statsText}>
              Date: {new Date(lastSession.endTime).toLocaleDateString()}
            </Text>
            <Text style={styles.statsText}>
              Time spent: {Math.round(lastSession.timeSpentMs / 1000)}s
            </Text>
            <Text style={styles.statsText}>
              Mastered: {lastSession.masteredCards} cards
            </Text>
            <Text style={styles.statsText}>
              Learning: {lastSession.learningCards} cards
            </Text>
          </View>
        )}
      </View>
    );
  };

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
  sessionStats: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2c3e50',
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7fb',
  },
  list: {
    padding: 16,
  },
  deckItem: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressContainer: {
    gap: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
});
