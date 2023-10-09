import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomApiService } from '@shared/room-api/room-api.service';
import { Room } from '@shared/room-api/room.interface';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent {
  public createForm = new FormGroup({});

  constructor(private router: Router, private roomApiService: RoomApiService) {}

  onSubmit(): void {
    this.roomApiService.createRoom({ size: 5 }).subscribe((room: Room) => {
      this.router.navigate(['room', room.id]);
    });
  }
}
