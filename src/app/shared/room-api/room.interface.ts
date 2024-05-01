import { LetterSequenceRule } from './letter-sequence-rule.enum';
import { RoomPlayer } from './room-player.interface';
import { RoomState } from './room-state.enum';

export interface Room {
  _id: string;
  size: number;
  capacity: number;
  repeatLimit: number;
  state: RoomState;
  currentPlayerName: string | null;
  players: RoomPlayer[];
  matrix: string[][];
  letterSequenceRules: LetterSequenceRule[];
}
