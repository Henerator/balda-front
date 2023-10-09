import { Room } from '@shared/room-api/room.interface';
import { RoomError } from './room-error.interface';

export interface ServerToClientEvents {
  error: (error: RoomError) => void;
  room: (room: Room) => void;
}
