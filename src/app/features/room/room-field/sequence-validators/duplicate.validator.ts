import { Position } from '../../models/position.interface';
import { SequenceValidator } from './sequence-validator.type';

export const duplicateSequenceValidator: SequenceValidator = (
  previous: Position,
  current: Position
) => {
  return previous.x === current.x && previous.y === current.y;
};
