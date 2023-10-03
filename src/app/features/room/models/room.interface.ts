import { Player } from './player.interface';
import { RoomState } from './room-state.enum';

export interface Room {
  id: string;
  size: number;
  capacity: number;
  state: RoomState;
  currentPlayerName: string | null;
  players: Player[];
  matrix: string[][];
}
