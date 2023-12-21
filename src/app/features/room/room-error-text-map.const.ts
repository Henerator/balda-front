import { RoomErrorId } from './models/room-error-id.enum';

export const roomErrorTextMap: { [key in RoomErrorId]: string } = {
  [RoomErrorId.roomNotFound]: 'Комната не найдена',
  [RoomErrorId.roomFull]: 'Комната заполнена',
  [RoomErrorId.notCurrentPlayerTurn]: 'Дождитесь вашего хода',
  [RoomErrorId.positionNotFound]: 'Выбрана невалидная буква',
  [RoomErrorId.positionFilled]: 'Выбранная ячейка не пуста',
  [RoomErrorId.wordNotFound]: 'Неизвестное слово',
  [RoomErrorId.wordAlreadyUsed]: 'Слово уже использовалось',
  [RoomErrorId.invalidWordSequence]: 'Невалидное слово',
  [RoomErrorId.noLetterInSequence]: 'Не выбрана введенная буква',
  [RoomErrorId.unfilledWordSequence]: 'Слово содержит пустые буквы',
  [RoomErrorId.invalidLetter]: 'Введена невалидная буква',
  [RoomErrorId.unknown]: 'Неизвестная ошибка',
};
