export interface CreateRoomDto {
  size: number;
  repeatLimit: number;
  allowDiagonalLetter: boolean;
  allowDuplicateLetter: boolean;
}
