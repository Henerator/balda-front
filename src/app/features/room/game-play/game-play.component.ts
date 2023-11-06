import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '@shared/room-api/room.interface';
import { GameState } from '../models/game-state.enum';
import { Position } from '../models/position.interface';
import { ChangedLetter } from '../room-field/models/changed-letter.interface';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss'],
})
export class GamePlayComponent {
  @Input() room!: Room;
  @Input() matrix: string[][] = [];
  @Input() gameState: GameState | null = null;
  @Input() changedLetter: ChangedLetter | null = null;

  @Output() letterChanged = new EventEmitter<ChangedLetter>();
  @Output() positionsSelected = new EventEmitter<Position[]>();
  @Output() wordApplied = new EventEmitter<void>();
  @Output() wordCanceled = new EventEmitter<void>();

  public gameStates = GameState;
}
