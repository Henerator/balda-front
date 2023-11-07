import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StorageService } from '@core/storage/storage.service';
import { environment } from '@env/environment';
import { Room } from '@shared/room-api/room.interface';
import { Socket, io } from 'socket.io-client';
import { JoinForm } from './join-form/models/join-form.interface';
import { ClientToServerEvents } from './models/client-to-server-events.interface';
import { GameState } from './models/game-state.enum';
import { Position } from './models/position.interface';
import { RoomErrorId } from './models/room-error-id.enum';
import { RoomMessage } from './models/room-message.enum';
import { ServerToClientEvents } from './models/server-to-client-events.interface';
import { StorageRoom } from './models/storage-room.interface';
import { ChangedLetter } from './room-field/models/changed-letter.interface';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  public loading = true;
  public gameStates = GameState;

  public room: Room | null = null;
  public matrix: string[][] = [];
  public gameState: GameState | null = null;
  public playerName: string | null = null;

  public changedLetter: ChangedLetter | null = null;
  public selectedPositions: Position[] = [];
  public applyWordErrors = 0;

  private roomId: string | null = null;
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    `${environment.socketServerUrl}/room`
  );

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.socket.on(RoomMessage.error, (message) => {
      console.log('[LOG] error', message);
      switch (message.id) {
        case RoomErrorId.wordNotFound:
        case RoomErrorId.wordAlreadyUsed:
          this.resetSelectedWord();
          this.applyWordErrors++;
          break;
        default:
          break;
      }
    });

    this.socket.on(RoomMessage.room, (room) => {
      this.room = room;
      this.udpateMatrix(room);
      this.updateGameState(room);

      this.setLoading(false);
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const roomId = params.get('id');

      if (!roomId) return;

      this.roomId = roomId;
      const savedPlayerName = this.getSavedPlayerName(roomId);

      if (savedPlayerName) {
        this.playerName = savedPlayerName;
        this.joinRoom(roomId, savedPlayerName);
        return;
      }

      this.setLoading(false);
    });
  }

  onJoinSubmit(joinForm: JoinForm): void {
    // TODO: handle empty cases
    if (!this.roomId) return;

    const playerName = joinForm.name;
    const storageKey = this.getStorageKey(this.roomId);
    this.storageService.setObject<StorageRoom>(storageKey, {
      playerName,
    });
    this.playerName = playerName;

    this.joinRoom(this.roomId, playerName);
  }

  onAddLeter(changedLetter: ChangedLetter) {
    this.changedLetter = changedLetter;
    this.gameState = GameState.selectWord;
  }

  onPositionsSelected(positions: Position[]): void {
    this.selectedPositions = positions;
  }

  onApplyWord(): void {
    if (!this.roomId || !this.playerName || !this.changedLetter) {
      return;
    }

    if (this.selectedPositions.length === 0) {
      return;
    }

    this.socket.emit(RoomMessage.newWord, {
      roomId: this.roomId,
      playerName: this.playerName,
      letter: this.changedLetter,
      word: this.selectedPositions,
    });
  }

  onCancelWord(): void {
    this.resetSelectedWord();
  }

  private setLoading(state: boolean): void {
    this.loading = state;
  }

  private resetSelectedWord(): void {
    this.changedLetter = null;
    this.selectedPositions = [];
    this.gameState = GameState.addLetter;
    this.udpateMatrix(this.room);
  }

  private getStorageKey(roomId: string): string {
    return `room-${roomId}`;
  }

  private getSavedPlayerName(roomId: string): string | null {
    const key = this.getStorageKey(roomId);
    return this.storageService.getObject<StorageRoom>(key)?.playerName ?? null;
  }

  private joinRoom(roomId: string, playerName: string): void {
    this.socket.emit(RoomMessage.join, {
      roomId,
      playerName,
    });
  }

  private udpateMatrix(room: Room | null): void {
    if (!room) return;
    this.matrix = room.matrix.slice();
  }

  private updateGameState(room: Room): void {
    if (room.currentPlayerName !== this.playerName) {
      this.gameState = GameState.waitingMyTurn;
      return;
    }

    this.gameState = GameState.addLetter;
  }
}
