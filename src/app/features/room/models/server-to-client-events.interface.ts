import { RoomError } from './room-error.interface';
import { Room } from './room.interface';

export interface ServerToClientEvents {
  error: (error: RoomError) => void;
  room: (room: Room) => void;
}
