import { CreateRoomDto } from '@shared/room-api/create-room-dto.interface';
import { repeatInfinity } from './repeat-limit-options.const';

export const defaultSettings: CreateRoomDto = {
  size: 5,
  allowDiagonalLetter: true,
  allowDuplicateLetter: true,
  repeatLimit: repeatInfinity,
};
