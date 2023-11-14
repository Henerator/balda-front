import { Position } from '../../models/position.interface';
import { SequenceValidator } from './sequence-validator.type';

export const horizontalSequenceValidator: SequenceValidator = (
  previous: Position,
  current: Position,
) => {
  return previous.y === current.y && Math.abs(previous.x - current.x) === 1;
};
