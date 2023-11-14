import { Position } from '../../models/position.interface';
import { SequenceValidator } from './sequence-validator.type';

export const diagonalSequenceValidator: SequenceValidator = (
  previous: Position,
  current: Position
) => {
  return (
    Math.abs(previous.x - current.x) === 1 &&
    Math.abs(previous.y - current.y) === 1
  );
};
