import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
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
    this.setCellShrink(value.length);
    this.cells = this.mapRoomMatrix(value);
  }

  @HostBinding('class.blocked')
  @Input()
  public blocked = false;

  @Output() letterChanged = new EventEmitter<ChangedLetter>();
  @Output() positionsSelected = new EventEmitter<Position[]>();

  public cells: FieldCell[][] = [];
  public cellShrink = 1;

  private selectedPositions: Position[] = [];
  private selectedCell: Position | null = null;
  private selectionStart: number | null = null;
  private longSelectionDelay = 400;

  onLetterChanged(letter: string, x: number, y: number): void {
    this.cells[y][x].value = letter;
    this.letterChanged.emit({
      char: letter,
      position: { x, y },
    });
  }

  onPointerDown(x: number, y: number): void {
    if (!this.selectable) return;
    this.selectedCell = { x, y };
    this.selectionStart = Date.now();
  }

  @HostListener('document:pointerup')
  onPointerUp(): void {
    if (!this.selectable) return;
    if (!this.selectedCell) return;

    const { x, y } = this.selectedCell;
    this.selectedCell = null;

    if (!this.cells[y][x].value) return;

    const lastSelected = this.selectedPositions.at(-1);

    if (this.cells[y][x].selected) {
      if (lastSelected?.x === x && lastSelected?.y === y) {
        if (this.duplcateAllowed() && this.isLongSelection()) {
          this.selectCell(x, y);
          return;
        }

        this.deselectCell(x, y);
        return;
      }
    }

    if (lastSelected && !this.validNextSelection(lastSelected, { x, y })) {
      return;
    }

    this.selectCell(x, y);
  }

  private resetState(): void {
    this.selectedPositions = [];
    this.selectedCell = null;
    this.selectionStart = null;
  }

  private setCellShrink(count: number): void {
    const normalCount = 6;
    if (count <= normalCount) {
      this.cellShrink = 1;
      return;
    }

    const shrinkStep = 0.1;
    this.cellShrink = 1 - (count - normalCount) * shrinkStep;
  }

  private selectCell(x: number, y: number): void {
    this.cells[y][x].selected = true;
    this.cells[y][x].selectionCount++;

    this.selectedPositions.push({ x, y });
    this.positionsSelected.emit(this.selectedPositions);
  }

  private deselectCell(x: number, y: number): void {
    this.cells[y][x].selectionCount--;
    if (this.cells[y][x].selectionCount === 0) {
      this.cells[y][x].selected = false;
    }

    this.selectedPositions.pop();
    this.positionsSelected.emit(this.selectedPositions);
  }

  private mapRoomMatrix(matrix: string[][]): FieldCell[][] {
    return matrix.map((row) =>
      row.map(
        (value) =>
          ({
            value,
            selected: false,
            selectionCount: 0,
          } as FieldCell)
      )
    );
  }

  private duplcateAllowed(): boolean {
    return this.letterSequenceRules.includes(LetterSequenceRule.duplicate);
  }

  private isLongSelection(): boolean {
    return (
      !!this.selectionStart &&
      Date.now() - this.selectionStart > this.longSelectionDelay
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
