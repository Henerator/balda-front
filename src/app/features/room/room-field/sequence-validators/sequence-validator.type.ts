import { Position } from '../../models/position.interface';

export type SequenceValidator = (
  previous: Position,
  current: Position,
) => boolean;
