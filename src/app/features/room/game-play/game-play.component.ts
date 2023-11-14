import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { LetterSequenceRule } from '@shared/room-api/letter-sequence-rule.enum';
import { Room } from '@shared/room-api/room.interface';
import { GameState } from '../models/game-state.enum';
import { Position } from '../models/position.interface';
import { ChangedLetter } from '../room-field/models/changed-letter.interface';
import { wrongWordAnimation } from './animations/wrong-word.animation';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss'],
  animations: [wrongWordAnimation],
})
export class GamePlayComponent {
  @Input() room!: Room;
  @Input() matrix: string[][] = [];
  @Input() gameState: GameState | null = null;
  @Input() changedLetter: ChangedLetter | null = null;

  @HostBinding('@wrongWordAnimation')
  @Input()
  errorsCount = 0;

  @Output() letterChanged = new EventEmitter<ChangedLetter>();
  @Output() positionsSelected = new EventEmitter<Position[]>();
  @Output() wordApplied = new EventEmitter<void>();
  @Output() wordCanceled = new EventEmitter<void>();

  public gameStates = GameState;
}
