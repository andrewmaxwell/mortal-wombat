import {isValidUrl} from '../utils/isValidUrl';

const SOUND_SETTING_SUFFIX = 'Sound';

// Sounds are named by tile type id ('g', 'p', …), by game config setting without the
// "Sound" suffix ('fallDamage', 'gameOver'), or by a URL, which scripts can play directly.
export class Sounds {
  constructor(gameConfig, typeIndex) {
    this.sounds = {};
    for (const type of Object.values(typeIndex)) {
      if (type.sound) this.sounds[type.id] = new Audio(type.sound);
    }
    for (const key in gameConfig) {
      if (key.endsWith(SOUND_SETTING_SUFFIX) && gameConfig[key]) {
        const name = key.slice(0, -SOUND_SETTING_SUFFIX.length);
        this.sounds[name] = new Audio(gameConfig[key]);
      }
    }
  }
  play(sound) {
    if (this.sounds[sound] === undefined && isValidUrl(sound)) {
      this.sounds[sound] = new Audio(sound);
    }
    // play() rejects when autoplay is blocked or playback is interrupted
    this.sounds[sound]?.play()?.catch(() => {});
  }
  pause(sound) {
    this.sounds[sound]?.pause();
  }
  loop(sound) {
    this.play(sound);
    if (this.sounds[sound]) this.sounds[sound].loop = true;
  }
}
