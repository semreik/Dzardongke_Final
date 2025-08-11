import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLanguage } from '../stores/useLanguage';
import { contentRegistry } from '../services/contentRegistry';
import type { Deck, Card } from '../types/deck';
import { Card as PromptCard } from '../components/Card';

type QuizOption = {
  text: string;
  isCorrect: boolean;
};

export const MultipleChoice: React.FC = () => {
  const { selectedLanguage } = useLanguage();
  const decks: Deck[] = contentRegistry[selectedLanguage].decks;

  const allCards = useMemo<Card[]>(() => {
    const cards = decks.flatMap(d => d.cards);
    // filter to cards that have a back (answer)
    return cards.filter(c => typeof c.back === 'string' && c.back.trim().length > 0);
  }, [decks]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentCard = allCards.length > 0 ? allCards[currentIndex % allCards.length] : null;

  const options: QuizOption[] = useMemo(() => {
    if (!currentCard) return [];
    const correct = currentCard.back;
    // Pick 3 distractors
    const pool = allCards
      .filter(c => c.id !== currentCard.id)
      .map(c => c.back)
      .filter((v, idx, arr) => typeof v === 'string' && v.trim().length > 0 && arr.indexOf(v) === idx);

    // Shuffle helper
    const shuffle = <T,>(arr: T[]) => arr.map(a => [Math.random(), a] as const).sort((a, b) => a[0] - b[0]).map(([, a]) => a);

    const distractors = shuffle(pool).slice(0, 3);
    const combined = shuffle([correct, ...distractors]).map(text => ({ text, isCorrect: text === correct }));
    return combined;
  }, [currentCard, allCards]);

  const handleSelect = (opt: QuizOption) => {
    if (showResult) return;
    setSelected(opt.text);
    setShowResult(true);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
    setSelected(null);
    setShowResult(false);
  };

  if (!currentCard) {
    return (
      <View style={styles.container}> 
        <Text style={styles.title}>Multiple Choice</Text>
        <Text style={styles.placeholder}>No cards available for this language.</Text>
      </View>
    );
  }

  const isCorrect = options.find(o => o.text === selected)?.isCorrect === true;
  const promptTitle = selectedLanguage === 'qu' ? 'What is the Quechua word for:' : 'What is the Dzardzongkha word for:';

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Multiple Choice</Text>
        <Text style={styles.prompt}>{promptTitle}</Text>
        <PromptCard card={currentCard} isFlipped={false} onFlip={() => {}} />

        <View style={styles.optionsContainer}>
          {options.map(opt => {
            const isSelected = selected === opt.text;
            const showCorrect = showResult && opt.isCorrect;
            const showWrong = showResult && isSelected && !opt.isCorrect;
            return (
              <TouchableOpacity
                key={opt.text}
                style={[styles.optionBtn, showCorrect ? styles.correctBtn : showWrong ? styles.wrongBtn : undefined]}
                onPress={() => handleSelect(opt)}
                disabled={showResult}
              >
                <Text style={styles.optionText}>{opt.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {showResult && (
          <View style={styles.feedbackContainer}>
            {isCorrect ? (
              <Text style={[styles.feedback, styles.correctText]}>Correct! 🎉</Text>
            ) : (
              <>
                <Text style={[styles.feedback, styles.wrongText]}>Not quite.</Text>
                <Text style={styles.explanationTitle}>Answer</Text>
                <Text style={styles.explanation}>
                  {selectedLanguage === 'qu' ? 'Quechua' : 'Dzardzongkha'}: {currentCard.back}
                </Text>
                {typeof currentCard.front === 'string' && currentCard.front.trim() !== '' && !currentCard.front.endsWith('.png') && (
                  <Text style={styles.explanation}>English prompt: {currentCard.front}</Text>
                )}
                {currentCard.notes && (
                  <Text style={styles.notes}>Notes: {currentCard.notes}</Text>
                )}
              </>
            )}
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 24 },
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  prompt: { fontSize: 16, color: '#555', marginBottom: 8 },
  optionsContainer: { gap: 10, marginTop: 8 },
  optionBtn: { backgroundColor: 'white', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  optionText: { fontSize: 16, color: '#111827' },
  correctBtn: { backgroundColor: '#E8F5E9', borderColor: '#4CAF50' },
  wrongBtn: { backgroundColor: '#FDECEC', borderColor: '#FF3B30' },
  feedbackContainer: { marginTop: 16, gap: 8 },
  feedback: { fontSize: 18 },
  correctText: { color: '#2e7d32', fontWeight: '600' },
  wrongText: { color: '#c62828', fontWeight: '600' },
  explanationTitle: { fontSize: 16, fontWeight: '600' },
  explanation: { fontSize: 16, color: '#374151' },
  notes: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  nextBtn: { alignSelf: 'flex-start', backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, marginTop: 8 },
  nextText: { color: 'white', fontWeight: '600', fontSize: 16 },
});

export default MultipleChoice;


