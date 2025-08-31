import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { audioService } from '../services/AudioService';
import { audioMap } from '../services/autoAudioMap';
import { dictionaryAudioMap } from '../services/dictionaryAudio';

export const AudioTest: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const testAudio = async (key: string) => {
    try {
      setIsPlaying(true);
      console.log('Testing audio with key:', key);
      console.log('Available in audioMap:', audioMap[key]);
      console.log('Available in dictionaryAudioMap:', dictionaryAudioMap[key]);
      
      await audioService.playAudio(key);
    } catch (error) {
      console.error('Audio test error:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Test Component</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => testAudio('go')}
        disabled={isPlaying}
      >
        <Text style={styles.buttonText}>Test 'go' Audio</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => testAudio('ang')}
        disabled={isPlaying}
      >
        <Text style={styles.buttonText}>Test 'ang' Dictionary Audio</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => testAudio('conversations_greetings_greetings_1_A')}
        disabled={isPlaying}
      >
        <Text style={styles.buttonText}>Test Conversation Audio</Text>
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.infoText}>Audio Map Keys: {Object.keys(audioMap).length}</Text>
        <Text style={styles.infoText}>Dictionary Keys: {Object.keys(dictionaryAudioMap).length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    marginVertical: 2,
  },
});
