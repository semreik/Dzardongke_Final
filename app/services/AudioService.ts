import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import { audioMap } from './autoAudioMap';
import { dictionaryAudioMap } from './dictionaryAudio';

// Static audio registry (keys -> require). Keep this list in sync with files under assets/.
// IMPORTANT: Only include files that actually exist to avoid bundling errors.
// You can extend this from conversation audio (see ConversationAudio.ts) or dictionary.


/**
 * Service to handle audio playback for dictionary pronunciations
 */
class AudioService {
  private sound: Audio.Sound | null = null;


  /**
   * Play an audio file from the assets directory
   * @param filename The filename of the audio file to play
   * @returns Promise that resolves when audio playback is complete
   */
  async playAudio(filename?: string): Promise<void> {
    try {
      // Set audio mode for platform compatibility
      const audioMode: any = {
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
      };
      
      // Only add platform-specific settings on native platforms
      if (Platform.OS === 'ios') {
        audioMode.interruptionModeIOS = Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX;
      } else if (Platform.OS === 'android') {
        audioMode.shouldDuckAndroid = true;
        audioMode.playThroughEarpieceAndroid = false;
        audioMode.interruptionModeAndroid = Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX;
      }
      // Web platform: no additional settings needed
      
      await Audio.setAudioModeAsync(audioMode);

      // Unload any previously loaded sound
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      // Try to find the audio source
      let source = null;
      
      console.log('🎵 AudioService.playAudio called with:', filename);
      
      // First, try to find in autoAudioMap
      if (filename && audioMap[filename]) {
        source = audioMap[filename];
        console.log('✅ Found in autoAudioMap:', filename);
      }
      // Then, try in dictionaryAudioMap
      else if (filename && dictionaryAudioMap[filename]) {
        source = dictionaryAudioMap[filename];
        console.log('✅ Found in dictionaryAudioMap:', filename);
      }
      // Try to convert conversation key format (conv/dz/age-birthday/birthday-age/2_B -> conversations_birthday_from_2_B)
      else if (filename && filename.startsWith('conv/')) {
        // Parse the conversation key: conv/dz/age-birthday/birthday-age/2_B
        const parts = filename.split('/');
        if (parts.length >= 5) {
          const categoryId = parts[2]; // age-birthday
          const conversationId = parts[3]; // birthday-age
          const audioFile = parts[4]; // 2_B
          
          // Map category IDs to audio folder names
          let audioFolder = categoryId;
          audioFolder = audioFolder.replace('age-birthday', 'birthday');
          audioFolder = audioFolder.replace('house-rooms', 'home');
          audioFolder = audioFolder.replace('clothing-style', 'clothing');
          audioFolder = audioFolder.replace('health-body', 'health');
          audioFolder = audioFolder.replace('food-drinks', 'food');
          audioFolder = audioFolder.replace('weather-seasons', 'weather');
          audioFolder = audioFolder.replace('freetime-hobbies', 'freetime_activites');
          audioFolder = audioFolder.replace('school-education', 'school');
          audioFolder = audioFolder.replace('travel-transport', 'travel');
          
          // Map conversation IDs to audio file prefixes
          let audioPrefix = conversationId;
          audioPrefix = audioPrefix.replace('birthday-age', 'from');
          audioPrefix = audioPrefix.replace('family-members', 'family');
          audioPrefix = audioPrefix.replace('house-rooms', 'home');
          audioPrefix = audioPrefix.replace('basic-home', 'home');
          audioPrefix = audioPrefix.replace('basic-greeting', 'greetings');
          audioPrefix = audioPrefix.replace('basic-clothing', 'clothes');
          audioPrefix = audioPrefix.replace('basic-health', 'health');
          audioPrefix = audioPrefix.replace('basic-food', 'food');
          audioPrefix = audioPrefix.replace('basic-weather', 'weather');
          audioPrefix = audioPrefix.replace('basic-freetime', 'hobbies');
          audioPrefix = audioPrefix.replace('basic-school', 'school');
          audioPrefix = audioPrefix.replace('basic-travel', 'travel');
          
          // Build the final key: conversations_birthday_from_2_B
          const convertedKey = `conversations_${audioFolder}_${audioPrefix}_${audioFile}`;
          
          console.log('🔍 AudioService Debug:');
          console.log('  Original key:', filename);
          console.log('  Category ID:', categoryId);
          console.log('  Conversation ID:', conversationId);
          console.log('  Audio file:', audioFile);
          console.log('  Audio folder:', audioFolder);
          console.log('  Audio prefix:', audioPrefix);
          console.log('  Converted key:', convertedKey);
          console.log('  Found in audioMap:', !!audioMap[convertedKey]);

          if (audioMap[convertedKey]) {
            source = audioMap[convertedKey];
            console.log('  ✅ Audio source found!');
          } else {
            // Try with _edited suffix
            const editedKey = `conversations_${audioFolder}_${audioPrefix}_${audioFile}_edited`;
            console.log('  Trying edited version:', editedKey);
            console.log('  Found edited in audioMap:', !!audioMap[editedKey]);
            
            if (audioMap[editedKey]) {
              source = audioMap[editedKey];
              console.log('  ✅ Audio source found with _edited!');
            } else {
              console.log('  ❌ Audio source NOT found!');
              console.log('  Available keys:', Object.keys(audioMap).filter(k => k.includes('conversations_')));
            }
          }
        }
      }
      // No fallback - just warn if no source found
      if (!source) {
        console.warn('No audio source found for:', filename);
        return;
      }

      console.log('🎵 Creating audio sound with source:', source);
      const { sound } = await Audio.Sound.createAsync(source, { shouldPlay: true });
      this.sound = sound;
      console.log('✅ Audio sound created successfully');
      
      return new Promise((resolve) => {
        sound.setOnPlaybackStatusUpdate((status: any) => {
          console.log('🎵 Audio status update:', status);
          if (status && status.didJustFinish) {
            console.log('🎵 Audio playback finished');
            this.unloadSound();
            resolve();
          }
        });
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      this.unloadSound();
    }
  }

  /**
   * Play by a known key registered in audioMap (no extension).
   */
  async playByKey(key?: string): Promise<void> {
    return this.playAudio(key);
  }

  /**
   * Play multiple registered keys in sequence.
   */
  async playSequence(keys: string[]): Promise<void> {
    for (const k of keys) {
      try {
        await this.playByKey(k);
      } catch {
        // continue to next
      }
    }
  }

  /**
   * Play conversation audio with support for multiple files per message
   * Special handling for birthday conversations that have multiple audio files per exchange
   */
  async playConversationAudio(filename?: string): Promise<void> {
    console.log('🎵 playConversationAudio called with:', filename);
    
    if (!filename || !filename.startsWith('conv/')) {
      console.log('🎵 Not a conversation audio, using normal playAudio');
      return this.playAudio(filename);
    }

    // Parse the conversation key: conv/dz/age-birthday/birthday-age/1_A
    const parts = filename.split('/');
    if (parts.length < 5) {
      console.log('🎵 Invalid conversation format, using normal playAudio');
      return this.playAudio(filename);
    }

    const categoryId = parts[2]; // age-birthday
    const conversationId = parts[3]; // birthday-age
    const audioFile = parts[4]; // 1_A
    
    console.log('🎵 Parsed conversation:', { categoryId, conversationId, audioFile });

    // Special handling for birthday conversations
    if (categoryId === 'age-birthday' && conversationId === 'birthday-age') {
      const messageNumber = parseInt(audioFile.split('_')[0]);
      const speaker = audioFile.split('_')[1];
      
      console.log('🎂 Birthday conversation audio:', { messageNumber, speaker });
      
      // Define the audio sequence for birthday conversation
      // Exchange 1 (A) -> from_1_A + from_2_A_edited
      // Exchange 2 (B) -> from_3_B + from_4_B  
      // Exchange 3 (A) -> from_5_A
      // Exchange 4 (B) -> from_6_B + from_7_B_edited
      const birthdaySequence = [
        ['conversations_birthday_from_1_A', 'conversations_birthday_from_2_A_edited'], // Exchange 1 (A)
        ['conversations_birthday_from_3_B', 'conversations_birthday_from_4_B'], // Exchange 2 (B)
        ['conversations_birthday_from_5_A'], // Exchange 3 (A)
        ['conversations_birthday_from_6_B', 'conversations_birthday_from_7_B_edited'], // Exchange 4 (B)
      ];
      
      const messageIndex = messageNumber - 1;
      if (messageIndex >= 0 && messageIndex < birthdaySequence.length) {
        const audioKeys = birthdaySequence[messageIndex];
        console.log('🎂 Playing birthday sequence for exchange', messageNumber, ':', audioKeys);
        
        // Play all audio files in sequence for this message
        for (const key of audioKeys) {
          try {
            console.log('🎂 Playing birthday audio key:', key);
            await this.playByKey(key);
          } catch (error) {
            console.error('❌ Birthday audio failed:', key, error);
          }
        }
        return;
      } else {
        console.error('❌ Birthday sequence index out of range:', messageIndex, 'for message', messageNumber);
      }
    }

    // Special handling for family conversations
    if (categoryId === 'family' && conversationId === 'family-members') {
      const messageNumber = parseInt(audioFile.split('_')[0]);
      const speaker = audioFile.split('_')[1];
      
      console.log('👨‍👩‍👧‍👦 Family conversation audio:', { messageNumber, speaker });
      
      // Define the audio sequence for family conversation
      // Exchange 1 (A) -> family_1_A
      // Exchange 2 (B) -> family_2_B
      // Exchange 3 (A) -> family_3_A
      // Exchange 4 (B) -> family_4_B
      // Exchange 5 (A) -> family_5_A
      // Exchange 6 (B) -> family_6_B + family_7_B (same message)
      // Exchange 7 (A) -> family_8_A
      // Exchange 8 (B) -> family_9_B
      const familySequence = [
        ['conversations_family_family_1_A'], // Exchange 1 (A)
        ['conversations_family_family_2_B'], // Exchange 2 (B)
        ['conversations_family_family_3_A'], // Exchange 3 (A)
        ['conversations_family_family_4_B'], // Exchange 4 (B)
        ['conversations_family_family_5_A'], // Exchange 5 (A)
        ['conversations_family_family_6_B', 'conversations_family_family_7_B'], // Exchange 6 (B) - two files
        ['conversations_family_family_8_A'], // Exchange 7 (A)
        ['conversations_family_family_9_B'], // Exchange 8 (B)
      ];
      
      const messageIndex = messageNumber - 1;
      if (messageIndex >= 0 && messageIndex < familySequence.length) {
        const audioKeys = familySequence[messageIndex];
        console.log('👨‍👩‍👧‍👦 Playing family sequence for exchange', messageNumber, ':', audioKeys);
        
        // Play all audio files in sequence for this message
        for (const key of audioKeys) {
          try {
            console.log('👨‍👩‍👧‍👦 Playing family audio key:', key);
            await this.playByKey(key);
          } catch (error) {
            console.error('❌ Family audio failed:', key, error);
          }
        }
        return;
      } else {
        console.error('❌ Family sequence index out of range:', messageIndex, 'for message', messageNumber);
      }
    }

    // Special handling for home conversations
    if (categoryId === 'house-rooms' && conversationId === 'house-rooms') {
      const messageNumber = parseInt(audioFile.split('_')[0]);
      const speaker = audioFile.split('_')[1];
      
      console.log('🏠 Home conversation audio:', { messageNumber, speaker });
      
      // Define the audio sequence for home conversation
      // Exchange 1 (A) -> home_1_A
      // Exchange 2 (B) -> home_2_B_edited
      // Exchange 3 (A) -> home_3_A (separate message)
      // Exchange 4 (A) -> home_4_A (separate message from same person)
      // Exchange 5 (B) -> home_5_B
      // Exchange 6 (A) -> home_6_A
      // Exchange 7 (B) -> home_7_B
      const homeSequence = [
        ['conversations_home_home_1_A'], // Exchange 1 (A)
        ['conversations_home_home_2_B_edited'], // Exchange 2 (B)
        ['conversations_home_home_3_A'], // Exchange 3 (A)
        ['conversations_home_home_4_A'], // Exchange 4 (A) - separate message
        ['conversations_home_home_5_B'], // Exchange 5 (B)
        ['conversations_home_home_6_A'], // Exchange 6 (A)
        ['conversations_home_home_7_B'], // Exchange 7 (B)
      ];
      
      const messageIndex = messageNumber - 1;
      if (messageIndex >= 0 && messageIndex < homeSequence.length) {
        const audioKeys = homeSequence[messageIndex];
        console.log('🏠 Playing home sequence for exchange', messageNumber, ':', audioKeys);
        
        // Play all audio files in sequence for this message
        for (const key of audioKeys) {
          try {
            console.log('🏠 Playing home audio key:', key);
            await this.playByKey(key);
          } catch (error) {
            console.error('❌ Home audio failed:', key, error);
          }
        }
        return;
      } else {
        console.error('❌ Home sequence index out of range:', messageIndex, 'for message', messageNumber);
      }
    }

    // Special handling for weather conversations
    if (categoryId === 'weather' && conversationId === 'weather-park') {
      const messageNumber = parseInt(audioFile.split('_')[0]);
      const speaker = audioFile.split('_')[1];
      
      console.log('🌤️ Weather conversation audio:', { messageNumber, speaker });
      
      // Define the audio sequence for weather conversation
      // Exchange 1 (A) -> weather_1_A_edited
      // Exchange 2 (B) -> weather_2_B
      // Exchange 3 (A) -> weather_3_A
      // Exchange 4 (B) -> weather_4_B + weather_5_B (same message)
      // Exchange 5 (A) -> weather_6_A + weather_7_A (same message)
      // Exchange 6 (B) -> weather_8_B + weather_9_B + weather_10_B (same message)
      // Exchange 7 (A) -> weather_11_A + weather_12_A (same message)
      // Exchange 8 (B) -> weather_13_B
      // Exchange 9 (A) -> weather_14_A
      const weatherSequence = [
        ['conversations_weather_weather_1_A_edited'], // Exchange 1 (A)
        ['conversations_weather_weather_2_B'], // Exchange 2 (B)
        ['conversations_weather_weather_3_A'], // Exchange 3 (A)
        ['conversations_weather_weather_4_B', 'conversations_weather_weather_5_B'], // Exchange 4 (B) - two files
        ['conversations_weather_weather_6_A', 'conversations_weather_weather_7_A'], // Exchange 5 (A) - two files
        ['conversations_weather_weather_8_B', 'conversations_weather_weather_9_B', 'conversations_weather_weather_10_B'], // Exchange 6 (B) - three files
        ['conversations_weather_weather_11_A', 'conversations_weather_weather_12_A'], // Exchange 7 (A) - two files
        ['conversations_weather_weather_13_B'], // Exchange 8 (B)
        ['conversations_weather_weather_14_A'], // Exchange 9 (A)
      ];
      
      const messageIndex = messageNumber - 1;
      if (messageIndex >= 0 && messageIndex < weatherSequence.length) {
        const audioKeys = weatherSequence[messageIndex];
        console.log('🌤️ Playing weather sequence for exchange', messageNumber, ':', audioKeys);
        
        // Play all audio files in sequence for this message
        for (const key of audioKeys) {
          try {
            console.log('🌤️ Playing weather audio key:', key);
            await this.playByKey(key);
          } catch (error) {
            console.error('❌ Weather audio failed:', key, error);
          }
        }
        return;
      } else {
        console.error('❌ Weather sequence index out of range:', messageIndex, 'for message', messageNumber);
      }
    }

    // Special handling for school conversations
    if (categoryId === 'school' && conversationId === 'school-schedule') {
      const messageNumber = parseInt(audioFile.split('_')[0]);
      const speaker = audioFile.split('_')[1];
      
      console.log('🎓 School conversation audio:', { messageNumber, speaker });
      
      // Define the audio sequence for school conversation
      // Exchange 1 (A) -> school_1_A
      // Exchange 2 (B) -> school_2_B
      // Exchange 3 (A) -> school_3_A + school_4_A_edited + school_5_A_edited (same message)
      // Exchange 4 (B) -> school_6_B + school_7_B + school_8_B (same message)
      // Exchange 5 (A) -> school_9_A
      const schoolSequence = [
        ['conversations_school_school_1_A'], // Exchange 1 (A)
        ['conversations_school_school_2_B'], // Exchange 2 (B)
        ['conversations_school_school_3_A', 'conversations_school_school_4_A_edited', 'conversations_school_school_5_A_edited'], // Exchange 3 (A) - three files
        ['conversations_school_school_6_B', 'conversations_school_school_7_B', 'conversations_school_school_8_B'], // Exchange 4 (B) - three files
        ['conversations_school_school_9_A'], // Exchange 5 (A)
      ];
      
      const messageIndex = messageNumber - 1;
      if (messageIndex >= 0 && messageIndex < schoolSequence.length) {
        const audioKeys = schoolSequence[messageIndex];
        console.log('🎓 Playing school sequence for exchange', messageNumber, ':', audioKeys);
        
        // Play all audio files in sequence for this message
        for (const key of audioKeys) {
          try {
            console.log('🎓 Playing school audio key:', key);
            await this.playByKey(key);
          } catch (error) {
            console.error('❌ School audio failed:', key, error);
          }
        }
        return;
      } else {
        console.error('❌ School sequence index out of range:', messageIndex, 'for message', messageNumber);
      }
    }

    // Special handling for food conversations
    if (categoryId === 'food' && conversationId === 'spicy-food') {
      const messageNumber = parseInt(audioFile.split('_')[0]);
      const speaker = audioFile.split('_')[1];
      
      console.log('🍽️ Food conversation audio:', { messageNumber, speaker });
      
      // Define the audio sequence for food conversation
      // Exchange 1 (A) -> food_1_A
      // Exchange 2 (B) -> food_2_B + food_3_B (same message)
      // Exchange 3 (A) -> food_4_A
      // Exchange 4 (B) -> food_5_B + food_6_B (same message)
      // Exchange 5 (A) -> food_7_A
      // Exchange 6 (B) -> food_8_B
      // Exchange 7 (A) -> food_9_A
      // Exchange 8 (B) -> food_10_B
      const foodSequence = [
        ['conversations_food_food_1_A'], // Exchange 1 (A)
        ['conversations_food_food_2_B', 'conversations_food_food_3_B'], // Exchange 2 (B) - two files
        ['conversations_food_food_4_A'], // Exchange 3 (A)
        ['conversations_food_food_5_B', 'conversations_food_food_6_B'], // Exchange 4 (B) - two files
        ['conversations_food_food_7_A'], // Exchange 5 (A)
        ['conversations_food_food_8_B'], // Exchange 6 (B)
        ['conversations_food_food_9_A'], // Exchange 7 (A)
        ['conversations_food_food_10_B'], // Exchange 8 (B)
      ];
      
      const messageIndex = messageNumber - 1;
      if (messageIndex >= 0 && messageIndex < foodSequence.length) {
        const audioKeys = foodSequence[messageIndex];
        console.log('🍽️ Playing food sequence for exchange', messageNumber, ':', audioKeys);
        
        // Play all audio files in sequence for this message
        for (const key of audioKeys) {
          try {
            console.log('🍽️ Playing food audio key:', key);
            await this.playByKey(key);
          } catch (error) {
            console.error('❌ Food audio failed:', key, error);
          }
        }
        return;
      } else {
        console.error('❌ Food sequence index out of range:', messageIndex, 'for message', messageNumber);
      }
    }

    // Special handling for freetime conversations
    if (categoryId === 'leisure' && conversationId === 'free-time') {
      const messageNumber = parseInt(audioFile.split('_')[0]);
      const speaker = audioFile.split('_')[1];
      
      console.log('🎮 Freetime conversation audio:', { messageNumber, speaker });
      
      // Define the audio sequence for freetime conversation
      // Exchange 1 (A) -> hobbies_1_A
      // Exchange 2 (B) -> hobbies_2_B
      // Exchange 3 (A) -> hobbies_3_A + hobbies_4_A (same message)
      // Exchange 4 (B) -> hobbies_5_B + hobbies_6_B (same message)
      // Exchange 5 (A) -> hobbies_7_A
      // Exchange 6 (B) -> hobbies_8_B
      // Exchange 7 (A) -> hobbies_9_A
      // Exchange 8 (B) -> hobbies_10_B
      const freetimeSequence = [
        ['conversations_freetime_activites_hobbies_1_A'], // Exchange 1 (A)
        ['conversations_freetime_activites_hobbies_2_B'], // Exchange 2 (B)
        ['conversations_freetime_activites_hobbies_3_A', 'conversations_freetime_activites_hobbies_4_A'], // Exchange 3 (A) - two files
        ['conversations_freetime_activites_hobbies_5_B', 'conversations_freetime_activites_hobbies_6_B'], // Exchange 4 (B) - two files
        ['conversations_freetime_activites_hobbies_7_A'], // Exchange 5 (A)
        ['conversations_freetime_activites_hobbies_8_B'], // Exchange 6 (B)
        ['conversations_freetime_activites_hobbies_9_A'], // Exchange 7 (A)
        ['conversations_freetime_activites_hobbies_10_B'], // Exchange 8 (B)
      ];
      
      const messageIndex = messageNumber - 1;
      if (messageIndex >= 0 && messageIndex < freetimeSequence.length) {
        const audioKeys = freetimeSequence[messageIndex];
        console.log('🎮 Playing freetime sequence for exchange', messageNumber, ':', audioKeys);
        
        // Play all audio files in sequence for this message
        for (const key of audioKeys) {
          try {
            console.log('🎮 Playing freetime audio key:', key);
            await this.playByKey(key);
          } catch (error) {
            console.error('❌ Freetime audio failed:', key, error);
          }
        }
        return;
      } else {
        console.error('❌ Freetime sequence index out of range:', messageIndex, 'for message', messageNumber);
      }
    }

    // Special handling for health conversations
    if (categoryId === 'health' && conversationId === 'feeling-sick') {
      const messageNumber = parseInt(audioFile.split('_')[0]);
      const speaker = audioFile.split('_')[1];
      
      console.log('🏥 Health conversation audio:', { messageNumber, speaker });
      
      // Define the audio sequence for health conversation
      // Exchange 1 (A) -> health_1_A
      // Exchange 2 (B) -> health_2_B
      // Exchange 3 (A) -> health_3_A
      // Exchange 4 (B) -> health_4_B
      // Exchange 5 (A) -> health_5_A
      // Exchange 6 (B) -> health_6_B
      // Exchange 7 (A) -> health_7_A
      const healthSequence = [
        ['conversations_health_health_1_A'], // Exchange 1 (A)
        ['conversations_health_health_2_B'], // Exchange 2 (B)
        ['conversations_health_health_3_A'], // Exchange 3 (A)
        ['conversations_health_health_4_B'], // Exchange 4 (B)
        ['conversations_health_health_5_A'], // Exchange 5 (A)
        ['conversations_health_health_6_B'], // Exchange 6 (B)
        ['conversations_health_health_7_A'], // Exchange 7 (A)
      ];
      
      const messageIndex = messageNumber - 1;
      if (messageIndex >= 0 && messageIndex < healthSequence.length) {
        const audioKeys = healthSequence[messageIndex];
        console.log('🏥 Playing health sequence for exchange', messageNumber, ':', audioKeys);
        
        // Play all audio files in sequence for this message
        for (const key of audioKeys) {
          try {
            console.log('🏥 Playing health audio key:', key);
            await this.playByKey(key);
          } catch (error) {
            console.error('❌ Health audio failed:', key, error);
          }
        }
        return;
      } else {
        console.error('❌ Health sequence index out of range:', messageIndex, 'for message', messageNumber);
      }
    }

    // Special handling for travel conversations
    if (categoryId === 'directions' && conversationId === 'lost-directions') {
      const messageNumber = parseInt(audioFile.split('_')[0]);
      const speaker = audioFile.split('_')[1];
      
      console.log('🚗 Travel conversation audio:', { messageNumber, speaker });
      
      // Define the audio sequence for travel conversation
      // Exchange 1 (A) -> travel_1_A
      // Exchange 2 (B) -> travel_2_B
      // Exchange 3 (A) -> travel_3_A_edited + travel_4_A_edited + travel_5_A_edited + travel_6_A_edited + travel_7_A (same message)
      // Exchange 4 (B) -> travel_8_B
      const travelSequence = [
        ['conversations_travel_travel_1_A'], // Exchange 1 (A)
        ['conversations_travel_travel_2_B'], // Exchange 2 (B)
        ['conversations_travel_travel_3_A_edited', 'conversations_travel_travel_4_A_edited', 'conversations_travel_travel_5_A_edited', 'conversations_travel_travel_6_A_edited', 'conversations_travel_travel_7_A'], // Exchange 3 (A) - five files
        ['conversations_travel_travel_8_B'], // Exchange 4 (B)
      ];
      
      const messageIndex = messageNumber - 1;
      if (messageIndex >= 0 && messageIndex < travelSequence.length) {
        const audioKeys = travelSequence[messageIndex];
        console.log('🚗 Playing travel sequence for exchange', messageNumber, ':', audioKeys);
        
        // Play all audio files in sequence for this message
        for (const key of audioKeys) {
          try {
            console.log('🚗 Playing travel audio key:', key);
            await this.playByKey(key);
          } catch (error) {
            console.error('❌ Travel audio failed:', key, error);
          }
        }
        return;
      } else {
        console.error('❌ Travel sequence index out of range:', messageIndex, 'for message', messageNumber);
      }
    }

    // Special handling for clothing conversations
    if (categoryId === 'clothing' && conversationId === 'clothing-weather') {
      const messageNumber = parseInt(audioFile.split('_')[0]);
      const speaker = audioFile.split('_')[1];
      
      console.log('👕 Clothing conversation audio:', { messageNumber, speaker });
      
      // Define the audio sequence for clothing conversation
      // Exchange 1 (A) -> clothes_1_A
      // Exchange 2 (B) -> clothes_2_B_edited
      // Exchange 3 (A) -> clothes_3_A
      // Exchange 4 (B) -> clothes_4_B_edited
      // Exchange 5 (A) -> clothes_5_A + clothes_6_A (same message)
      // Exchange 6 (B) -> clothes_7_B
      const clothingSequence = [
        ['conversations_clothing_clothes_1_A'], // Exchange 1 (A)
        ['conversations_clothing_clothes_2_B_edited'], // Exchange 2 (B)
        ['conversations_clothing_clothes_3_A'], // Exchange 3 (A)
        ['conversations_clothing_clothes_4_B_edited'], // Exchange 4 (B)
        ['conversations_clothing_clothes_5_A', 'conversations_clothing_clothes_6_A'], // Exchange 5 (A) - two files
        ['conversations_clothing_clothes_7_B'], // Exchange 6 (B)
      ];
      
      const messageIndex = messageNumber - 1;
      if (messageIndex >= 0 && messageIndex < clothingSequence.length) {
        const audioKeys = clothingSequence[messageIndex];
        console.log('👕 Playing clothing sequence for exchange', messageNumber, ':', audioKeys);
        
        // Play all audio files in sequence for this message
        for (const key of audioKeys) {
          try {
            console.log('👕 Playing clothing audio key:', key);
            await this.playByKey(key);
          } catch (error) {
            console.error('❌ Clothing audio failed:', key, error);
          }
        }
        return;
      } else {
        console.error('❌ Clothing sequence index out of range:', messageIndex, 'for message', messageNumber);
      }
    }

    // For all other conversations, use the normal single-file approach
    return this.playAudio(filename);
  }

  /**
   * Unload the current sound to free up resources
   */
  private unloadSound(): void {
    if (this.sound) {
      this.sound.unloadAsync();
      this.sound = null;
    }
  }
}

// Export a singleton instance
export const audioService = new AudioService();
