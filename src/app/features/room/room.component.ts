import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from '@env/environment';
import { Socket, io } from 'socket.io-client';
import { ClientToServerEvents } from './models/client-to-server-events.interface';
import { Room } from './models/room.interface';
import { ServerToClientEvents } from './models/server-to-client-events.interface';
import { RoomMessage } from './room-message.enum';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  public joinForm = new FormGroup({
    // name: new FormControl<string>('', Validators.required),
    name: new FormControl<string>('Roman', Validators.required),
  });

  public room: Room | null = null;

  private socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    `${environment.socketServerUrl}/room`
  );
  private roomId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.socket.on(RoomMessage.error, (message) => {
      console.log('[LOG] error', message);
    });

    this.socket.on(RoomMessage.room, (room) => {
      console.log('[LOG] room', room);
      this.room = room;
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.roomId = params.get('id');
    });
  }

  onSubmit(): void {
    // TODO: handle empty cases
    if (this.joinForm.invalid) return;
    if (!this.roomId) return;
    if (!this.joinForm.value.name) return;

    this.socket.emit(RoomMessage.join, {
      roomId: this.roomId,
      playerName: this.joinForm.value.name,
    });
  }
}
