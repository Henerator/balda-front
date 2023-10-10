import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from '@env/environment';
import { Room } from '@shared/room-api/room.interface';
import { StorageService } from '@shared/storage/storage.service';
import { Socket, io } from 'socket.io-client';
import { JoinForm } from './join-form/models/join-form.interface';
import { ClientToServerEvents } from './models/client-to-server-events.interface';
import { GameState } from './models/game-state.enum';
import { Position } from './models/position.interface';
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
  public gameStates = GameState;

  public room: Room | null = null;
  public gameState: GameState | null = null;
  public playerName: string | null = null;

  private roomId: string | null = null;
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    `${environment.socketServerUrl}/room`
  );

  private changedLetter: ChangedLetter | null = null;
  private selectedPositions: Position[] = [];

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.socket.on(RoomMessage.error, (message) => {
      console.log('[LOG] error', message);
    });

    this.socket.on(RoomMessage.room, (room) => {
      console.log('[LOG] room', room);
      this.room = room;
      this.updateGameState(room);
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
    console.log('[LOG] changed letter', changedLetter);
    this.changedLetter = changedLetter;
    this.gameState = GameState.selectWord;
  }

  onPositionsSelected(positions: Position[]): void {
    console.log('[LOG] selectedPositions', positions);
    this.selectedPositions = positions;
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

  private updateGameState(room: Room): void {
    if (room.currentPlayerName !== this.playerName) {
      this.gameState = GameState.waitingMyTurn;
      return;
    }

    this.gameState = GameState.addLetter;
  }
}
