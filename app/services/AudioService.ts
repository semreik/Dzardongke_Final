import { Audio } from 'expo-av';
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

      // Try to find the audio source
      let source = null;
      
      // First, try to find in autoAudioMap
      if (filename && audioMap[filename]) {
        source = audioMap[filename];
      }
      // Then, try in dictionaryAudioMap
      else if (filename && dictionaryAudioMap[filename]) {
        source = dictionaryAudioMap[filename];
      }
      // Finally, fall back to default click
      else {
        source = audioMap['go'] || audioMap['default_click'];
      }

      if (!source) {
        console.warn('No audio source found for:', filename);
        return;
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
