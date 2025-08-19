import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../stores/useLanguage';

type Step =
  | 'intro1'
  | 'intro2'
  | 'intro3'
  | 'image'
  | 'quiz'
  | 'region1'
  | 'region2'
  | 'regionImage'
  | 'regionFest'
  | 'regionQuiz'
  | 'done';

interface QuizOption {
  text: string;
  correct: boolean;
}

const Culture: React.FC = () => {
  const { selectedLanguage } = useLanguage();
  const [step, setStep] = useState<Step>('intro1');
  const fade = useRef(new Animated.Value(1)).current;
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [multiSelected, setMultiSelected] = useState<Set<string>>(new Set());
  const [showResultMulti, setShowResultMulti] = useState(false);

  const quizOptions: QuizOption[] = useMemo(
    () => [
      { text: 'fortress', correct: false },
      { text: 'new york', correct: false },
      { text: 'new castle', correct: true },
      { text: 'summer town', correct: false },
    ],
    []
  );

  const stepsOrder: Step[] = ['intro1', 'intro2', 'intro3', 'image', 'quiz', 'region1', 'region2', 'regionImage', 'regionFest', 'regionQuiz'];
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

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const IMG_SOURCE = require('../../assets/images/Culture/culture1.png');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const IMG_SOURCE_2 = require('../../assets/images/Culture/culture2.png');

  const subtitle = useMemo(() => {
    if (step === 'intro1' || step === 'intro2' || step === 'intro3' || step === 'image' || step === 'quiz') {
      return 'Part a — Introduction to the Dzardzongkha language';
    }
    if (step === 'region1' || step === 'region2' || step === 'regionImage' || step === 'regionFest' || step === 'regionQuiz') {
      return 'Part b — About the Dzardzongkha region';
    }
    return 'Culture';
  }, [step]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Culture</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <Animated.View style={{ opacity: fade }}>
        {step === 'intro1' && (
          <View style={styles.card}>
            <Text style={styles.p}>
              Mustang is one of 77 districts in Nepal, and the most sparsely populated. Like many districts or parts of
              districts, it was once an autonomous kingdom that was integrated into Nepal during the unification of the
              country by the Gorkhas in the late 18th century. The Tibetan name for the kingdom founded in the 14th c. is
              Lo. The district headquarters of Mustang is Jomsom or Dzongsam in the local language called ‘Dzardzongkha’.
              Sam is the Dzardzongkha word for “new” and dzong means ‘castle’ so the name of the town of Jomsom means
              “Newcastle”.
            </Text>
          </View>
        )}

        {step === 'intro2' && (
          <View style={styles.card}>
            <Text style={styles.p}>
              Dzardzongkha is a variety of Tibetan spoken in the majority of villages of Baragaon, in South Mustang. The
              name of the language is derived from the local name for the Muktinath Valley, Dzardzong Yuldruk, which means
              the “Six Villages including Dzar and Dzong.” Dzardzongkha is similar to other Tibetic languages, especially
              those spoken nearby like Loke in Upper Mustang. But it also has unique words and grammatical features that are
              not found in any other variety, not even, for example, in Loke or other Tibetic languages spoken in Nepal or
              in the more widely used varieties like Standard or Lhasa Tibetan.
            </Text>
          </View>
        )}

        {step === 'intro3' && (
          <View style={styles.card}>
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
                  assets/images/Culture/culture1.png
                </Text>
              </View>
            ) : (
              <Image source={IMG_SOURCE} style={styles.photo} resizeMode="contain" onError={() => setImageError(true)} />
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

        {step === 'region1' && (
          <View style={styles.card}>
            <Text style={styles.p}>
              A short distance north of Jomsom is the Pandak river, an eastern tributary of the Kali Gandaki. This river is an old territorial boundary. To the south of it is the territory of the former kingdom of Thini (also known as Sompo). The area to the north of it was controlled by a settlement called Tshotsholung or “Old Kagbeni”. Old Kagbeni was submerged by a massive landslide at some unknown period and moved to its present location, a short distance to the north as the entrance of the Muktinath Valley.
            </Text>
          </View>
        )}

        {step === 'region2' && (
          <View style={styles.card}>
            <Text style={styles.p}>
              All this territory, up to the present-day Tibetan border, both north and south of the Pandak River, was conquered by the founder of the kingdom of Lo, Amepal (a mes dpal) in the 14th century. The Pandak River is also a cultural dividing line: villages to the south of it speak Thakali, a Tamangic language in the Tibeto-Burman family. Communities to the north of it speak different varieties of Tibetan or Seke, which is more like Thakali. Currently, Dzardzongke is spoken in the villages of Lubrak, Kagbeni, Khyenga, Chongkor, Dzar, Dzong and Chusang.
            </Text>
          </View>
        )}

        {step === 'regionImage' && (
          <View style={styles.card}>
            <Image source={IMG_SOURCE_2} style={styles.photo} resizeMode="contain" onError={() => setImageError(true)} />
            <Text style={styles.caption}>The northern part of the village of Chusang - August 2022</Text>
          </View>
        )}

        {step === 'regionFest' && (
          <View style={styles.card}>
            <Text style={styles.p}>
              In some of the villages in the Dzardzongke Valley and beyond, they still celebrate festivals like the Dachang and the Yarthung. Traditionally, the main ceremony was the Demdem Chöpa, which featured dancing, singing, archery and the propitiation of local territorial gods. It is not known when the ceremony used to be celebrated, but the Dachang ceremonies that are held in each of the villages may be the local survivals of this once inter-communal event between multiple villages. In the next lesson, you will learn more about the Dachang and other festivals.
            </Text>
          </View>
        )}

        {step === 'regionQuiz' && (
          <View style={styles.card}>
            <Text style={styles.quizTitle}>Quiz</Text>
            <Text style={styles.quizQ}>What did they do during the ancient Demdem Chöpa ceremony?</Text>
            <View style={{ gap: 8, marginTop: 8 }}>
              {[
                { text: 'dancing', correct: true },
                { text: 'singing', correct: true },
                { text: 'worship the buddha', correct: false },
                { text: 'archery', correct: true },
              ].map(opt => {
                const isSelected = multiSelected.has(opt.text);
                const isCorrect = showResultMulti && opt.correct;
                const isWrong = showResultMulti && isSelected && !opt.correct;
                return (
                  <TouchableOpacity
                    key={opt.text}
                    style={[styles.choice, isSelected ? { borderColor: '#2563eb' } : undefined, isCorrect ? styles.correct : isWrong ? styles.wrong : undefined]}
                    onPress={() => {
                      if (showResultMulti) return;
                      const next = new Set(multiSelected);
                      if (next.has(opt.text)) next.delete(opt.text); else next.add(opt.text);
                      setMultiSelected(next);
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
        <TouchableOpacity
          style={[styles.navBtn, stepsOrder.indexOf(step) <= 0 ? styles.disabled : undefined]}
          disabled={stepsOrder.indexOf(step) <= 0}
          onPress={() => {
            const idx = stepsOrder.indexOf(step);
            const prev = idx > 0 ? stepsOrder[idx - 1] : stepsOrder[0];
            go(prev);
          }}
        >
          <MaterialCommunityIcons name="chevron-left" size={18} color={stepsOrder.indexOf(step) <= 0 ? '#9ca3af' : '#0f172a'} />
          <Text style={[styles.navText, stepsOrder.indexOf(step) <= 0 ? styles.disabledText : undefined]}>Back</Text>
        </TouchableOpacity>
        {step !== 'done' && (
          <TouchableOpacity
            style={[styles.navBtn, styles.primary]}
            onPress={() => {
              if (step === 'regionQuiz' && !showResultMulti) {
                setShowResultMulti(true);
                return;
              }
              const idx = stepsOrder.indexOf(step);
              const next = idx < stepsOrder.length - 1 ? stepsOrder[idx + 1] : 'done';
              go(next as Step);
            }}
          >
            <Text style={[styles.navText, { color: 'white' }]}>
              {step === 'quiz' ? 'Next' : step === 'regionQuiz' && !showResultMulti ? 'Check answers' : step === 'regionQuiz' ? 'Finish' : 'Next'}
            </Text>
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
  meta: { fontSize: 14, color: '#64748b' },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e5e7eb', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
  p: { color: '#1f2937', lineHeight: 22, marginBottom: 8 },
  photo: { width: '100%', borderRadius: 14, backgroundColor: '#f8fafc' },
  caption: { marginTop: 10, color: '#475569', fontStyle: 'italic' },
  quizTitle: { fontWeight: '700', marginBottom: 4 },
  quizQ: { color: '#374151' },
  choice: { backgroundColor: 'white', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  choiceText: { color: '#111827' },
  correct: { backgroundColor: '#E8F5E9', borderColor: '#4CAF50' },
  wrong: { backgroundColor: '#FDECEC', borderColor: '#FF3B30' },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: 'white' },
  navText: { fontWeight: '600', color: '#0f172a' },
  disabled: { opacity: 0.5 },
  disabledText: { color: '#9ca3af' },
  primary: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
});

export default Culture;


