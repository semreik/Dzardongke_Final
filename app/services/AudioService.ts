import { Audio } from 'expo-av';
import { audioMap } from './autoAudioMap';

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
