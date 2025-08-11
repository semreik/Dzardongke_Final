import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLanguage } from '../stores/useLanguage';
import { contentRegistry } from '../services/contentRegistry';
import type { Deck, Card } from '../types/deck';
import { useSaved } from '../stores/useSaved';

type QuizOption = {
  text: string;
  isCorrect: boolean;
};

type QuizItem = { prompt: string; answer: string; notes?: string };

export const MultipleChoice: React.FC = () => {
  const { selectedLanguage } = useLanguage();
  const decks: Deck[] = contentRegistry[selectedLanguage].decks;
  const dictionary = contentRegistry[selectedLanguage].dictionary;

  // Heuristics to decide if a string is a good standalone prompt/answer
  const isSensibleText = (s?: string) => {
    if (!s) return false;
    const t = s.trim();
    if (!t) return false;
    if (/🎉|\!|\?|…/.test(t)) return false;
    if (t.endsWith('.png')) return false;
    if (t.length > 24) return false;
    return true;
  };

  const deckItems = useMemo<QuizItem[]>(() => {
    const items: QuizItem[] = [];
    decks.forEach(deck => {
      deck.cards.forEach((c: Card) => {
        if (
          typeof c.back === 'string' &&
          isSensibleText(c.back) &&
          typeof c.front === 'string' &&
          isSensibleText(c.front) &&
          !/celebration/i.test(c.id)
        ) {
          items.push({ prompt: String(c.front), answer: String(c.back), notes: c.notes });
        }
      });
    });
    return items;
  }, [decks]);

  const dictItems = useMemo<QuizItem[]>(() => {
    const items: QuizItem[] = [];
    const seen = new Set<string>();
    dictionary.entries.forEach((e: any) => {
      const en = e.en as string;
      const dz = e.dz as string;
      if (isSensibleText(en) && isSensibleText(dz)) {
        const key = `${en}=>${dz}`;
        if (!seen.has(key)) {
          items.push({ prompt: en, answer: dz });
          seen.add(key);
        }
      }
    });
    return items;
  }, [dictionary.entries]);

  const quizPool = useMemo<QuizItem[]>(() => {
    const combined = [...dictItems, ...deckItems];
    // dedupe by prompt=>answer
    const map = new Map<string, QuizItem>();
    combined.forEach(it => {
      const key = `${it.prompt}=>${it.answer}`;
      if (!map.has(key)) map.set(key, it);
    });
    const arr = Array.from(map.values());
    // shuffle
    return arr
      .map(a => [Math.random(), a] as const)
      .sort((a, b) => a[0] - b[0])
      .map(([, a]) => a);
  }, [dictItems, deckItems]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { saveItem } = useSaved();

  const currentItem = quizPool.length > 0 ? quizPool[currentIndex % quizPool.length] : null;

  const options: QuizOption[] = useMemo(() => {
    if (!currentItem) return [];
    const correct = currentItem.answer;
    // Pick 3 distractors
    const pool = quizPool
      .map(q => q.answer)
      .filter((v, idx, arr) => typeof v === 'string' && v.trim().length > 0 && v !== correct && arr.indexOf(v) === idx);

    // Shuffle helper
    const shuffle = <T,>(arr: T[]) => arr.map(a => [Math.random(), a] as const).sort((a, b) => a[0] - b[0]).map(([, a]) => a);

    const distractors = shuffle(pool).slice(0, 3);
    const combined = shuffle([correct, ...distractors]).map(text => ({ text, isCorrect: text === correct }));
    return combined;
  }, [currentItem, quizPool]);

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

  if (!currentItem) {
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
        <Text style={styles.bigPrompt}>{currentItem.prompt}</Text>

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
                <Text style={styles.explanation}>{selectedLanguage === 'qu' ? 'Quechua' : 'Dzardzongkha'}: {currentItem.answer}</Text>
                <Text style={styles.explanation}>English: {currentItem.prompt}</Text>
                {currentItem.notes && <Text style={styles.notes}>Notes: {currentItem.notes}</Text>}
              </>
            )}
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => saveItem({
                prompt: currentItem.prompt,
                answer: currentItem.answer,
                language: selectedLanguage as any,
                explanation: `“${currentItem.answer}” means “${currentItem.prompt}”. ${currentItem.notes ? `Notes: ${currentItem.notes}` : ''}`,
                source: 'deck'
              })}
            >
              <Text style={styles.saveText}>Save to Profile</Text>
            </TouchableOpacity>
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
  saveBtn: { alignSelf: 'flex-start', backgroundColor: '#10b981', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, marginTop: 4 },
  saveText: { color: 'white', fontWeight: '600', fontSize: 16 },
  nextBtn: { alignSelf: 'flex-start', backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, marginTop: 8 },
  nextText: { color: 'white', fontWeight: '600', fontSize: 16 },
});

export default MultipleChoice;


