import { Injectable } from '@angular/core';
import { ruLetters } from './letters/ru-letters.const';

@Injectable()
export class LetterValidatorService {
  validate(letter: string): string | null {
    if (ruLetters.has(letter)) return letter;

    return null;
  }
}
