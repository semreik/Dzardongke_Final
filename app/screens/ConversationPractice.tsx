import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Image,
  SafeAreaView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import type { Exchange } from '../types/conversation';
import { useLanguage } from '../stores/useLanguage';
import { contentRegistry } from '../services/contentRegistry';

type ConversationPracticeRouteProp = RouteProp<{
  params: {
    categoryId: string;
    conversationId: string;
    title: string;
  };
}, 'params'>;

const { width } = Dimensions.get('window');

export const ConversationPractice: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<ConversationPracticeRouteProp>();
  const { categoryId, conversationId, title } = route.params;
  const { selectedLanguage } = useLanguage();
  const categories = contentRegistry[selectedLanguage].conversations.categories;
  const category = categories.find(cat => cat.id === categoryId);
  const conversation = category?.conversations.find(conv => conv.id === conversationId);
  const exchanges = conversation ? conversation.exchanges : [];
  
  const [currentExchangeIndex, setCurrentExchangeIndex] = useState(0);
  const [showDzardzongke, setShowDzardzongke] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  
  const speakingAnimation = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title || 'Conversation Practice',
    });
  }, [navigation, title]);

  useEffect(() => {
    // Reset animation when changing exchanges
    speakingAnimation.setValue(0);
    setShowDzardzongke(false);
    
    // Start speaking animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(speakingAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(speakingAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 4 }
    ).start();

    // Scroll to top when changing exchanges
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
    
    // Clean up sound when component unmounts or exchange changes
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentExchangeIndex]);

  const handleNext = () => {
    if (currentExchangeIndex < exchanges.length - 1) {
      setCurrentExchangeIndex(currentExchangeIndex + 1);
    } else {
      // End of conversation
      navigation.goBack();
    }
  };

  const handlePrevious = () => {
    if (currentExchangeIndex > 0) {
      setCurrentExchangeIndex(currentExchangeIndex - 1);
    }
  };

  const toggleDzardzongke = () => {
    setShowDzardzongke(!showDzardzongke);
  };

  const currentExchange = exchanges[currentExchangeIndex];
  const isSpeakerA = currentExchange?.speaker === 'A';
  
  // Animation for mouth movement
  const mouthTransform = {
    transform: [
      {
        scaleY: speakingAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.7],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentExchangeIndex + 1} / {exchanges.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentExchangeIndex + 1) / exchanges.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.characterContainer}>
          {/* Speaker A */}
          <View style={[
            styles.character, 
            isSpeakerA ? styles.activeSpeaker : styles.inactiveSpeaker
          ]}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatarImage, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.avatarText}>A</Text>
              </View>
              {isSpeakerA && (
                <Animated.View style={[styles.mouth, mouthTransform]} />
              )}
            </View>
            <Text style={styles.speakerLabel}>Speaker A</Text>
          </View>
          
          {/* Speaker B */}
          <View style={[
            styles.character, 
            !isSpeakerA ? styles.activeSpeaker : styles.inactiveSpeaker
          ]}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatarImage, { backgroundColor: '#2196F3' }]}>
                <Text style={styles.avatarText}>B</Text>
              </View>
              {!isSpeakerA && (
                <Animated.View style={[styles.mouth, mouthTransform]} />
              )}
            </View>
            <Text style={styles.speakerLabel}>Speaker B</Text>
          </View>
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.contentContainer}
          contentContainerStyle={styles.contentInner}
        >
          {currentExchange && (
            <>
              <View style={styles.bubbleContainer}>
                <View style={[
                  styles.bubble,
                  isSpeakerA ? styles.bubbleLeft : styles.bubbleRight
                ]}>
                  <Text style={styles.bubbleText}>{currentExchange.english}</Text>
                </View>
              </View>
              
              {showDzardzongke && (
                <View style={styles.translationContainer}>
                  <Text style={styles.translationLabel}>Dzardzongke:</Text>
                  <View style={styles.translationBubble}>
                    <Text style={styles.translationText}>{currentExchange.dzardzongke}</Text>
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>

        <View style={styles.controlsContainer}>
          <TouchableOpacity 
            style={[styles.controlButton, currentExchangeIndex === 0 ? styles.disabledButton : {}]}
            onPress={handlePrevious}
            disabled={currentExchangeIndex === 0}
          >
            <MaterialIcons 
              name="arrow-back" 
              size={24} 
              color={currentExchangeIndex === 0 ? '#ccc' : '#007AFF'} 
            />
            <Text style={[
              styles.controlText,
              currentExchangeIndex === 0 ? styles.disabledText : {}
            ]}>Previous</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.translationButton}
            onPress={toggleDzardzongke}
          >
            <MaterialIcons 
              name={showDzardzongke ? 'visibility-off' : 'visibility'} 
              size={24} 
              color="#007AFF" 
            />
            <Text style={styles.controlText}>
              {showDzardzongke ? 'Hide Translation' : 'Show Translation'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={handleNext}
          >
            <Text style={styles.controlText}>
              {currentExchangeIndex < exchanges.length - 1 ? 'Next' : 'Finish'}
            </Text>
            <MaterialIcons 
              name={currentExchangeIndex < exchanges.length - 1 ? 'arrow-forward' : 'check'} 
              size={24} 
              color="#007AFF" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  characterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  character: {
    alignItems: 'center',
    width: width / 3,
  },
  activeSpeaker: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  inactiveSpeaker: {
    opacity: 0.6,
    transform: [{ scale: 0.9 }],
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 8,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  mouth: {
    position: 'absolute',
    bottom: 20,
    width: 20,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
  },
  speakerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    marginBottom: 16,
  },
  contentInner: {
    paddingBottom: 16,
  },
  bubbleContainer: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  bubble: {
    padding: 16,
    borderRadius: 16,
    maxWidth: '80%',
  },
  bubbleLeft: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  bubbleRight: {
    backgroundColor: '#E2F0FE',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontSize: 16,
    color: '#333',
  },
  translationContainer: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  translationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  translationBubble: {
    backgroundColor: '#F0F0F0',
    padding: 16,
    borderRadius: 16,
  },
  translationText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  controlText: {
    fontSize: 16,
    color: '#007AFF',
    marginHorizontal: 4,
  },
  disabledText: {
    color: '#ccc',
  },
  translationButton: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
  },
});
