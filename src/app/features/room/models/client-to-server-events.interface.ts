import { JoinRoom } from './join-room.interface';

export interface ClientToServerEvents {
  join: (data: JoinRoom) => void;
}
