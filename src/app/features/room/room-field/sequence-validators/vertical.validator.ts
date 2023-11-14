import { Position } from '../../models/position.interface';
import { SequenceValidator } from './sequence-validator.type';

export const verticalSequenceValidator: SequenceValidator = (
  previous: Position,
  current: Position
) => {
  return previous.x === current.x && Math.abs(previous.y - current.y) === 1;
};
