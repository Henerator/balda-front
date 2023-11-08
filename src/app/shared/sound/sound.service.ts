import { Injectable } from '@angular/core';
import { Sound } from './sound.enum';

@Injectable()
export class SoundService {
  private soundsPath = '/assets/sounds';

  private sounds: { [key in Sound]: HTMLAudioElement } = {
    myTurn: new Audio(`${this.soundsPath}/my-turn.mp3`),
  };

  play(name: Sound): void {
    if (name in this.sounds) {
      this.sounds[name].play();
    }
  }
}
