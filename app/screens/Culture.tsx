import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo, useRef, useState } from 'react';
import { Animated, Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../stores/useLanguage';

type Step = 'intro' | 'image' | 'quiz' | 'done';

interface QuizOption {
  text: string;
  correct: boolean;
}

const Culture: React.FC = () => {
  const { selectedLanguage } = useLanguage();
  const [step, setStep] = useState<Step>('intro');
  const fade = useRef(new Animated.Value(1)).current;
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [imageError, setImageError] = useState(false);

  const quizOptions: QuizOption[] = useMemo(
    () => [
      { text: 'fortress', correct: false },
      { text: 'new york', correct: false },
      { text: 'new castle', correct: true },
      { text: 'summer town', correct: false },
    ],
    []
  );

  const go = (next: Step) => {
    Animated.sequence([
      Animated.timing(fade, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start(() => setStep(next));
  };

  if (selectedLanguage !== 'dz') {
    return (
      <View style={styles.container}> 
        <Text style={styles.title}>Culture</Text>
        <Text style={styles.meta}>This section is currently available for Dzardzongkha only. Quechua coming soon.</Text>
      </View>
    );
  }

  let cultureImageSource: ImageSourcePropType;
  try {
    // Preferred image path
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    cultureImageSource = require('../../assets/images/culture/culture1.png');
  } catch (e) {
    // Fallback to an existing placeholder so bundling never fails if the file is missing
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    cultureImageSource = require('../../assets/images/splash-icon.png');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Culture</Text>
      <Text style={styles.subtitle}>Part a — Introduction to the Dzardzongkha language</Text>

      <Animated.View style={{ opacity: fade }}>
        {step === 'intro' && (
          <View style={styles.card}>
            <Text style={styles.p}>
              Mustang is one of 77 districts in Nepal, and the most sparsely populated. Like many districts or parts of
              districts, it was once an autonomous kingdom that was integrated into Nepal during the unification of the
              country by the Gorkhas in the late 18th century. The Tibetan name for the kingdom founded in the 14th c. is
              Lo. The district headquarters of Mustang is Jomsom or Dzongsam in the local language called ‘Dzardzongkha’.
              Sam is the Dzardzongkha word for “new” and dzong means ‘castle’ so the name of the town of Jomsom means
              “Newcastle”.
            </Text>
            <Text style={styles.p}>
              Dzardzongkha is a variety of Tibetan spoken in the majority of villages of Baragaon, in South Mustang. The
              name of the language is derived from the local name for the Muktinath Valley, Dzardzong Yuldruk, which means
              the “Six Villages including Dzar and Dzong.” Dzardzongkha is similar to other Tibetic languages, especially
              those spoken nearby like Loke in Upper Mustang. But it also has unique words and grammatical features that are
              not found in any other variety, not even, for example, in Loke or other Tibetic languages spoken in Nepal or
              in the more widely used varieties like Standard or Lhasa Tibetan.
            </Text>
            <Text style={styles.p}>
              Dzardzongkha is an endangered language, which means that it is at high risk of being lost forever. It is
              currently still spoken by around 1800 speakers. Some of these live in the Muktinath Valley, but many have moved
              to bigger cities like Kathmandu, Hong Kong, Paris or New York. Together with Dzardzongkha speakers, we have
              developed this app to help preserve the Dzardzongkha language and the cultural heritage of its speakers. With
              the app, you can learn about local history and festivals like the dachang ‘arrow-beer’ or the yarthung ‘summer’
              festival. You can also use the app to learn to speak the language, or, if you already speak it, you can learn
              how to write it.
            </Text>
          </View>
        )}

        {step === 'image' && (
          <View style={styles.card}>
            {imageError ? (
              <View style={[styles.photo, { alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' }]}> 
                <Text style={{ color: '#64748b', textAlign: 'center' }}>
                  Missing image file at
                  {'\n'}
                  assets/images/culture/culture1.png
                </Text>
              </View>
            ) : (
              <Image
                source={cultureImageSource}
                style={styles.photo}
                resizeMode="cover"
                onError={() => setImageError(true)}
              />
            )}
            <Text style={styles.caption}>Part of the Muktinath Valley with Dzar on the left and Dzong on the right — August 2022</Text>
          </View>
        )}

        {step === 'quiz' && (
          <View style={styles.card}>
            <Text style={styles.quizTitle}>Quiz</Text>
            <Text style={styles.quizQ}>What does the name of the town Jomsom mean?</Text>
            <View style={{ gap: 8, marginTop: 8 }}>
              {quizOptions.map(opt => {
                const isSelected = selected === opt.text;
                const isCorrect = showResult && opt.correct;
                const isWrong = showResult && isSelected && !opt.correct;
                return (
                  <TouchableOpacity
                    key={opt.text}
                    style={[styles.choice, isCorrect ? styles.correct : isWrong ? styles.wrong : undefined]}
                    onPress={() => {
                      if (showResult) return;
                      setSelected(opt.text);
                      setShowResult(true);
                    }}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.choiceText}>{opt.text}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </Animated.View>

      <View style={styles.navRow}>
        <TouchableOpacity style={[styles.navBtn, step === 'intro' ? styles.disabled : undefined]} disabled={step === 'intro'} onPress={() => go(step === 'image' ? 'intro' : 'image')}>
          <MaterialCommunityIcons name="chevron-left" size={18} color={step === 'intro' ? '#9ca3af' : '#0f172a'} />
          <Text style={[styles.navText, step === 'intro' ? styles.disabledText : undefined]}>Back</Text>
        </TouchableOpacity>
        {step !== 'done' && (
          <TouchableOpacity style={[styles.navBtn, styles.primary]} onPress={() => go(step === 'intro' ? 'image' : step === 'image' ? 'quiz' : 'done')}>
            <Text style={[styles.navText, { color: 'white' }]}>{step === 'quiz' ? 'Finish' : 'Next'}</Text>
            <MaterialCommunityIcons name="chevron-right" size={18} color={'white'} />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f7f7fb' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 16, color: '#475569', marginBottom: 10 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#e5e7eb' },
  p: { color: '#1f2937', lineHeight: 22, marginBottom: 8 },
  photo: { width: '100%', height: 180, borderRadius: 10 },
  caption: { marginTop: 6, color: '#6b7280', fontStyle: 'italic' },
  quizTitle: { fontWeight: '700', marginBottom: 4 },
  quizQ: { color: '#374151' },
  choice: { backgroundColor: 'white', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  choiceText: { color: '#111827' },
  correct: { backgroundColor: '#E8F5E9', borderColor: '#4CAF50' },
  wrong: { backgroundColor: '#FDECEC', borderColor: '#FF3B30' },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: 'white' },
  navText: { fontWeight: '600', color: '#0f172a' },
  disabled: { opacity: 0.5 },
  disabledText: { color: '#9ca3af' },
  primary: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
});

export default Culture;


