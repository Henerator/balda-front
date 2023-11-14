import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { FieldCell } from '../models/field-cell.interface';
import { Position } from '../models/position.interface';
import { ChangedLetter } from './models/changed-letter.interface';
import { SequenceValidator } from './sequence-validators/sequence-validator.type';
import { sequenceValidatorsMap } from './sequence-validators/sequence-validators.map';
import { LetterSequenceRule } from '@shared/room-api/letter-sequence-rule.enum';

@Component({
  selector: 'app-room-field',
  templateUrl: './room-field.component.html',
  styleUrls: ['./room-field.component.scss'],
})
export class RoomFieldComponent {
  @Input() public title = '';
  @Input() public editable = false;
  @Input() public selectable = false;
  @Input() public letterSequenceRules: LetterSequenceRule[] = [];
  @Input() public set matrix(value: string[][]) {
    this.resetState();
    this.cells = this.mapRoomMatrix(value);
  }

  @HostBinding('class.blocked')
  @Input()
  public blocked = false;

  @Output() letterChanged = new EventEmitter<ChangedLetter>();
  @Output() positionsSelected = new EventEmitter<Position[]>();

  public cells: FieldCell[][] = [];

  private selectedPositions: Position[] = [];

  onLetterChanged(letter: string, x: number, y: number): void {
    this.cells[y][x].value = letter;
    this.letterChanged.emit({
      char: letter,
      position: { x, y },
    });
  }

  onCellClick(x: number, y: number): void {
    if (!this.selectable) return;
    if (!this.cells[y][x].value) return;

    const lastSelected = this.selectedPositions.at(-1);

    if (this.cells[y][x].selected) {
      if (lastSelected?.x === x && lastSelected?.y === y) {
        this.cells[y][x].selected = false;
        this.selectedPositions.pop();
        this.positionsSelected.emit(this.selectedPositions);
      }

      return;
    }

    if (lastSelected && !this.validNextSelection(lastSelected, { x, y })) {
      return;
    }

    this.cells[y][x].selected = true;
    this.selectedPositions.push({ x, y });
    this.positionsSelected.emit(this.selectedPositions);
  }

  private resetState(): void {
    this.selectedPositions = [];
  }

  private mapRoomMatrix(matrix: string[][]): FieldCell[][] {
    return matrix.map((row) =>
      row.map((value) => ({
        value,
        selected: false,
      }))
    );
  }

  private validNextSelection(previous: Position, current: Position): boolean {
    const validators = this.getSequenceValidators(this.letterSequenceRules);
    return validators.some((validator) => validator(previous, current));
  }

  private getSequenceValidators(
    roomRules: LetterSequenceRule[]
  ): SequenceValidator[] {
    return [
      LetterSequenceRule.horizontal,
      LetterSequenceRule.vertical,
      ...roomRules,
    ].map((rule) => sequenceValidatorsMap[rule]);
  }
}
