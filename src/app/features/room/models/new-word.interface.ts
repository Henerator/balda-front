import { ChangedLetter } from '../room-field/models/changed-letter.interface';
import { Position } from './position.interface';

export interface NewWord {
  roomId: string;
  playerName: string;
  letter: ChangedLetter;
  word: Position[];
}
