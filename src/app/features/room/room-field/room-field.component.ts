import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FieldCell } from '../models/field-cell.interface';
import { Position } from '../models/position.interface';
import { ChangedLetter } from './models/changed-letter.interface';

@Component({
  selector: 'app-room-field',
  templateUrl: './room-field.component.html',
  styleUrls: ['./room-field.component.scss'],
})
export class RoomFieldComponent {
  @Input() public editable = false;
  @Input() public selectable = false;
  @Input() public set matrix(value: string[][]) {
    this.cells = this.mapRoomMatrix(value);
  }

  @Output() letterChanged = new EventEmitter<ChangedLetter>();
  @Output() positionsSelected = new EventEmitter<Position[]>();

  public cells: FieldCell[][] = [];

  private selectedPositions: Position[] = [];

  onLetterChanged(letter: string, x: number, y: number): void {
    this.cells[y][x].value = letter;
    this.letterChanged.emit({
      letter,
      position: { x, y },
    });
  }

  onCellClick(x: number, y: number): void {
    if (!this.selectable) return;
    if (!this.cells[y][x].value) return;

    const lastSelected = this.selectedPositions.at(-1);

    if (
      this.cells[y][x].selected &&
      lastSelected?.x === x &&
      lastSelected?.y === y
    ) {
      this.cells[y][x].selected = false;
      this.selectedPositions.pop();
      this.positionsSelected.emit(this.selectedPositions);
      return;
    }

    if (lastSelected && !this.validNextSelection(lastSelected, x, y)) {
      return;
    }

    this.cells[y][x].selected = true;
    this.selectedPositions.push({ x, y });
    this.positionsSelected.emit(this.selectedPositions);
  }

  private mapRoomMatrix(matrix: string[][]): FieldCell[][] {
    return matrix.map((row) =>
      row.map((value) => ({
        value,
        selected: false,
      }))
    );
  }

  private validNextSelection(
    lastSelected: Position,
    x: number,
    y: number
  ): boolean {
    return (
      (lastSelected.x === x && Math.abs(lastSelected.y - y) === 1) ||
      (lastSelected.y === y && Math.abs(lastSelected.x - x) === 1)
    );
  }
}
