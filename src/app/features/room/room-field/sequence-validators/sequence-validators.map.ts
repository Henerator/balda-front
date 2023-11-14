import { LetterSequenceRule } from '@shared/room-api/letter-sequence-rule.enum';
import { diagonalSequenceValidator } from './diagonal.validator';
import { horizontalSequenceValidator } from './horizontal.validator';
import { SequenceValidator } from './sequence-validator.type';
import { verticalSequenceValidator } from './vertical.validator';

export const sequenceValidatorsMap: {
  [key in LetterSequenceRule]: SequenceValidator;
} = {
  [LetterSequenceRule.horizontal]: horizontalSequenceValidator,
  [LetterSequenceRule.vertical]: verticalSequenceValidator,
  [LetterSequenceRule.diagonal]: diagonalSequenceValidator,
};
