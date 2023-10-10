import { JoinRoom } from './join-room.interface';
import { NewWord } from './new-word.interface';

export interface ClientToServerEvents {
  join: (data: JoinRoom) => void;
  newWord: (data: NewWord) => void;
}
