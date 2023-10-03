import { RoomErrorId } from './room-error-id.enum';

export interface RoomError {
  id: RoomErrorId;
  message: string;
}
