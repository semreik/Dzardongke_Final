import { Audio } from 'expo-av';
import { dictionaryAudioMap } from './dictionaryAudio';

// Static audio registry (keys -> require). Keep this list in sync with files under assets/.
// IMPORTANT: Only include files that actually exist to avoid bundling errors.
// You can extend this from conversation audio (see ConversationAudio.ts) or dictionary.
const audioMap: Record<string, any> = {
  // Generic default click/beep (placeholder):
  'default_click': require('../../assets/audio/go.mp3'),
  // Example (when actual files exist):
  // Dzardzongke • Greetings • Basic Greeting (moved under folder)
  'conv/dz/greetings/basic-greeting/1_A': require('../../assets/audio/conversations/greetings/greetings_1_A.wav'),
  'conv/dz/greetings/basic-greeting/2_B': require('../../assets/audio/conversations/greetings/greetings_2_B.wav'),
  'conv/dz/greetings/basic-greeting/3_A': require('../../assets/audio/conversations/greetings/greetings_3_A.wav'),
  'conv/dz/greetings/basic-greeting/4_B': require('../../assets/audio/conversations/greetings/greetings_4_B.wav'),
  'conv/dz/greetings/basic-greeting/5_A': require('../../assets/audio/conversations/greetings/greetings_5_A.wav'),
  'conv/dz/greetings/basic-greeting/6_B': require('../../assets/audio/conversations/greetings/greetings_6_B.wav'),
  'conv/dz/greetings/basic-greeting/7_A': require('../../assets/audio/conversations/greetings/greetings_7_A.wav'),
  'conv/dz/greetings/basic-greeting/8_B': require('../../assets/audio/conversations/greetings/greetings_8_B.wav'),

  // Dzardzongke • Family • Family Members
  'conv/dz/family/family-members/1_A': require('../../assets/audio/conversations/family/family_1_A.wav'),
  'conv/dz/family/family-members/2_B': require('../../assets/audio/conversations/family/family_2_B.wav'),
  'conv/dz/family/family-members/3_A': require('../../assets/audio/conversations/family/family_3_A.wav'),
  'conv/dz/family/family-members/4_B': require('../../assets/audio/conversations/family/family_4_B.wav'),
  'conv/dz/family/family-members/5_A': require('../../assets/audio/conversations/family/family_5_A.wav'),
  'conv/dz/family/family-members/6_B': require('../../assets/audio/conversations/family/family_6_B.wav'),
  // Special case: the 6_B message is two sentences; a second clip is provided as 7_B
  'conv/dz/family/family-members/7_B': require('../../assets/audio/conversations/family/family_7_B.wav'),
  // No 7_A file present; skipping.
  // Use provided filenames but align to conversation indices (7_A, 8_B are the last two messages)
  'conv/dz/family/family-members/7_A': require('../../assets/audio/conversations/family/family_8_A.wav'),
  'conv/dz/family/family-members/8_B': require('../../assets/audio/conversations/family/family_9_B.wav'),

  // Dzardzongke • Home • House and Rooms (note: 2_B clip named with _edited suffix)
  'conv/dz/home/house-rooms/1_A': require('../../assets/audio/conversations/home/home_1_A.wav'),
  'conv/dz/home/house-rooms/2_B': require('../../assets/audio/conversations/home/home_2_B_edited.wav'),
  'conv/dz/home/house-rooms/3_A': require('../../assets/audio/conversations/home/home_3_A.wav'),
  'conv/dz/home/house-rooms/4_A': require('../../assets/audio/conversations/home/home_4_A.wav'),
  'conv/dz/home/house-rooms/5_B': require('../../assets/audio/conversations/home/home_5_B.wav'),
  'conv/dz/home/house-rooms/6_A': require('../../assets/audio/conversations/home/home_6_A.wav'),
  'conv/dz/home/house-rooms/7_B': require('../../assets/audio/conversations/home/home_7_B.wav'),

  // Dzardzongke • Food • Spicy Food (with multi-clip B messages)
  'conv/dz/food/spicy-food/1_A': require('../../assets/audio/conversations/food/food_1_A.wav'),
  'conv/dz/food/spicy-food/2_B': require('../../assets/audio/conversations/food/food_2_B.wav'),
  'conv/dz/food/spicy-food/3_B': require('../../assets/audio/conversations/food/food_3_B.wav'),
  'conv/dz/food/spicy-food/4_A': require('../../assets/audio/conversations/food/food_4_A.wav'),
  'conv/dz/food/spicy-food/5_B': require('../../assets/audio/conversations/food/food_5_B.wav'),
  'conv/dz/food/spicy-food/6_B': require('../../assets/audio/conversations/food/food_6_B.wav'),
  'conv/dz/food/spicy-food/7_A': require('../../assets/audio/conversations/food/food_7_A.wav'),
  'conv/dz/food/spicy-food/8_B': require('../../assets/audio/conversations/food/food_8_B.wav'),
  'conv/dz/food/spicy-food/9_A': require('../../assets/audio/conversations/food/food_9_A.wav'),
  'conv/dz/food/spicy-food/10_B': require('../../assets/audio/conversations/food/food_10_B.wav'),

  // Dzardzongke • Age & Birthday • Birthday Wishes
  'conv/dz/age-birthday/birthday-age/1_A': require('../../assets/audio/conversations/birthday/from_1_A.wav'),
  'conv/dz/age-birthday/birthday-age/2_A': require('../../assets/audio/conversations/birthday/from_2_A_edited.wav'),
  'conv/dz/age-birthday/birthday-age/3_B': require('../../assets/audio/conversations/birthday/from_3_B.wav'),
  'conv/dz/age-birthday/birthday-age/4_B': require('../../assets/audio/conversations/birthday/from_4_B.wav'),
  'conv/dz/age-birthday/birthday-age/5_A': require('../../assets/audio/conversations/birthday/from_5_A.wav'),
  'conv/dz/age-birthday/birthday-age/6_B': require('../../assets/audio/conversations/birthday/from_6_B.wav'),
  'conv/dz/age-birthday/birthday-age/7_B': require('../../assets/audio/conversations/birthday/from_7_B_edited.wav'),

  // Dzardzongke • Weather • Weather and Park
  'conv/dz/weather/weather-park/1_A': require('../../assets/audio/conversations/weather/weather_1_A_edited.wav'),
  'conv/dz/weather/weather-park/2_B': require('../../assets/audio/conversations/weather/weather_2_B.wav'),
  'conv/dz/weather/weather-park/3_A': require('../../assets/audio/conversations/weather/weather_3_A.wav'),
  'conv/dz/weather/weather-park/4_B': require('../../assets/audio/conversations/weather/weather_4_B.wav'),
  'conv/dz/weather/weather-park/5_B': require('../../assets/audio/conversations/weather/weather_5_B.wav'),
  'conv/dz/weather/weather-park/6_A': require('../../assets/audio/conversations/weather/weather_6_A.wav'),
  'conv/dz/weather/weather-park/7_A': require('../../assets/audio/conversations/weather/weather_7_A.wav'),
  'conv/dz/weather/weather-park/8_B': require('../../assets/audio/conversations/weather/weather_8_B.wav'),
  'conv/dz/weather/weather-park/9_B': require('../../assets/audio/conversations/weather/weather_9_B.wav'),
  'conv/dz/weather/weather-park/10_B': require('../../assets/audio/conversations/weather/weather_10_B.wav'),
  'conv/dz/weather/weather-park/11_A': require('../../assets/audio/conversations/weather/weather_11_A.wav'),
  'conv/dz/weather/weather-park/12_A': require('../../assets/audio/conversations/weather/weather_12_A.wav'),
  'conv/dz/weather/weather-park/13_B': require('../../assets/audio/conversations/weather/weather_13_B.wav'),
  'conv/dz/weather/weather-park/14_A': require('../../assets/audio/conversations/weather/weather_14_A.wav'),

  // Dzardzongke • School • School Schedule
  'conv/dz/school/school-schedule/1_A': require('../../assets/audio/conversations/school/school_1_A.wav'),
  'conv/dz/school/school-schedule/2_B': require('../../assets/audio/conversations/school/school_2_B.wav'),
  'conv/dz/school/school-schedule/3_A': require('../../assets/audio/conversations/school/school_3_A.wav'),
  'conv/dz/school/school-schedule/4_A': require('../../assets/audio/conversations/school/school_4_A_edited.wav'),
  'conv/dz/school/school-schedule/5_A': require('../../assets/audio/conversations/school/school_5_A_edited.wav'),
  'conv/dz/school/school-schedule/6_B': require('../../assets/audio/conversations/school/school_6_B.wav'),
  'conv/dz/school/school-schedule/7_B': require('../../assets/audio/conversations/school/school_7_B.wav'),
  'conv/dz/school/school-schedule/8_B': require('../../assets/audio/conversations/school/school_8_B.wav'),
  'conv/dz/school/school-schedule/9_A': require('../../assets/audio/conversations/school/school_9_A.wav'),

  // Dzardzongke • Leisure • Free Time Activities
  'conv/dz/leisure/free-time/1_A': require('../../assets/audio/conversations/freetime_activites/hobbies_1_A.wav'),
  'conv/dz/leisure/free-time/2_B': require('../../assets/audio/conversations/freetime_activites/hobbies_2_B.wav'),
  'conv/dz/leisure/free-time/3_A': require('../../assets/audio/conversations/freetime_activites/hobbies_3_A.wav'),
  'conv/dz/leisure/free-time/4_A': require('../../assets/audio/conversations/freetime_activites/hobbies_4_A.wav'),
  'conv/dz/leisure/free-time/5_B': require('../../assets/audio/conversations/freetime_activites/hobbies_5_B.wav'),
  'conv/dz/leisure/free-time/6_B': require('../../assets/audio/conversations/freetime_activites/hobbies_6_B.wav'),
  'conv/dz/leisure/free-time/7_A': require('../../assets/audio/conversations/freetime_activites/hobbies_7_A.wav'),
  'conv/dz/leisure/free-time/8_B': require('../../assets/audio/conversations/freetime_activites/hobbies_8_B.wav'),
  'conv/dz/leisure/free-time/9_A': require('../../assets/audio/conversations/freetime_activites/hobbies_9_A.wav'),
  'conv/dz/leisure/free-time/10_B': require('../../assets/audio/conversations/freetime_activites/hobbies_10_B.wav'),

  // Dzardzongke • Clothing • Clothing for Weather
  'conv/dz/clothing/clothing-weather/1_A': require('../../assets/audio/conversations/clothing/clothes_1_A.wav'),
  'conv/dz/clothing/clothing-weather/2_B': require('../../assets/audio/conversations/clothing/clothes_2_B_edited.wav'),
  'conv/dz/clothing/clothing-weather/3_A': require('../../assets/audio/conversations/clothing/clothes_3_A.wav'),
  'conv/dz/clothing/clothing-weather/4_B': require('../../assets/audio/conversations/clothing/clothes_4_B_edited.wav'),
  'conv/dz/clothing/clothing-weather/5_A': require('../../assets/audio/conversations/clothing/clothes_5_A.wav'),
  'conv/dz/clothing/clothing-weather/6_A': require('../../assets/audio/conversations/clothing/clothes_6_A.wav'),
  'conv/dz/clothing/clothing-weather/7_B': require('../../assets/audio/conversations/clothing/clothes_7_B.wav'),

  // Dzardzongke • Health • Feeling Sick
  'conv/dz/health/feeling-sick/1_A': require('../../assets/audio/conversations/health/health_1_A.wav'),
  'conv/dz/health/feeling-sick/2_B': require('../../assets/audio/conversations/health/health_2_B.wav'),
  'conv/dz/health/feeling-sick/3_A': require('../../assets/audio/conversations/health/health_3_A.wav'),
  'conv/dz/health/feeling-sick/4_B': require('../../assets/audio/conversations/health/health_4_B.wav'),
  'conv/dz/health/feeling-sick/5_A': require('../../assets/audio/conversations/health/health_5_A.wav'),
  'conv/dz/health/feeling-sick/6_B': require('../../assets/audio/conversations/health/health_6_B.wav'),
  'conv/dz/health/feeling-sick/7_A': require('../../assets/audio/conversations/health/health_7_A.wav'),

  // Dzardzongke • Directions • Lost and Directions (travel)
  'conv/dz/directions/lost-directions/1_A': require('../../assets/audio/conversations/travel/travel_1_A.wav'),
  'conv/dz/directions/lost-directions/2_B': require('../../assets/audio/conversations/travel/travel_2_B.wav'),
  'conv/dz/directions/lost-directions/3_A': require('../../assets/audio/conversations/travel/travel_3_A_edited.wav'),
  'conv/dz/directions/lost-directions/4_A': require('../../assets/audio/conversations/travel/travel_4_A_edited.wav'),
  'conv/dz/directions/lost-directions/5_A': require('../../assets/audio/conversations/travel/travel_5_A_edited.wav'),
  'conv/dz/directions/lost-directions/6_A': require('../../assets/audio/conversations/travel/travel_6_A_edited.wav'),
  'conv/dz/directions/lost-directions/7_A': require('../../assets/audio/conversations/travel/travel_7_A.wav'),
  'conv/dz/directions/lost-directions/8_B': require('../../assets/audio/conversations/travel/travel_8_B.wav'),
};

/**
 * Service to handle audio playback for dictionary pronunciations
 */
class AudioService {
  private sound: Audio.Sound | null = null;

  /**
   * Play an audio file from the assets/audio directory
   * @param filename The filename of the audio file to play
   * @returns Promise that resolves when audio playback is complete
   */
  async playAudio(filename?: string): Promise<void> {
    try {
      // Unload any previously loaded sound
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      // Try registry-based playback if key exists, otherwise check dictionary map, else default click
      let key = filename && audioMap[filename] ? filename : undefined;
      let source = key ? audioMap[key] : undefined;
      if (!source && filename && dictionaryAudioMap[filename]) {
        key = filename;
        source = dictionaryAudioMap[filename];
      }
      if (!source) {
        key = 'default_click';
        source = audioMap[key];
      }
      const { sound } = await Audio.Sound.createAsync(source, { shouldPlay: true });
      this.sound = sound;
      return new Promise((resolve) => {
        sound.setOnPlaybackStatusUpdate((status: any) => {
          if (status && status.didJustFinish) {
            this.unloadSound();
            resolve();
          }
        });
      });

      // Wait for the audio to finish playing
      // This code is not currently used since we're simulating audio playback
      // But we'll keep it for when we implement actual audio playback
      /*
      return new Promise((resolve) => {
        this.sound?.setOnPlaybackStatusUpdate((status: Audio.PlaybackStatus) => {
          if (status.didJustFinish) {
            this.unloadSound();
            resolve();
          }
        });
      });
      */
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
