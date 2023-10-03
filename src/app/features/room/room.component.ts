import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from '@env/environment';
import { StorageService } from '@shared/storage/storage.service';
import { Socket, io } from 'socket.io-client';
import { ClientToServerEvents } from './models/client-to-server-events.interface';
import { Room } from './models/room.interface';
import { ServerToClientEvents } from './models/server-to-client-events.interface';
import { StorageRoom } from './models/storage-room.interface';
import { RoomMessage } from './room-message.enum';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  public room: Room | null = null;
  public joinForm: FormGroup | null = null;

  private socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    `${environment.socketServerUrl}/room`
  );
  private roomId: string | null = null;

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
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const roomId = params.get('id');

      if (!roomId) return;

      this.roomId = roomId;
      const savedPlayerName = this.getSavedPlayerName(roomId);

      if (savedPlayerName) {
        this.joinRoom(roomId, savedPlayerName);
        return;
      }

      this.createForm();
    });
  }

  onSubmit(): void {
    // TODO: handle empty cases
    if (!this.joinForm) return;
    if (this.joinForm.invalid) return;
    if (!this.roomId) return;
    if (!this.joinForm.value.name) return;

    const storageKey = this.getStorageKey(this.roomId);
    this.storageService.setObject<StorageRoom>(storageKey, {
      playerName: this.joinForm.value.name,
    });

    this.joinRoom(this.roomId, this.joinForm.value.name);
  }

  private createForm(): void {
    this.joinForm = new FormGroup({
      name: new FormControl<string>('', Validators.required),
    });
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
}
