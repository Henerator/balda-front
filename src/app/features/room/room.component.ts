import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { RoomMessage } from './room-message.enum';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  private socket = io(`${environment.socketServerUrl}/room`);
  private roomId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.socket.on(RoomMessage.error, (message) => {
      console.log('[LOG] error', message);
    });

    this.socket.on(RoomMessage.room, (message) => {
      console.log('[LOG] room', message);
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.roomId = params.get('id');
      this.socket.emit(RoomMessage.join, {
        roomId: this.roomId,
        playerName: 'Some name',
      });
    });
  }
}
