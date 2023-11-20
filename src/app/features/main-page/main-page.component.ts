import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateRoomDto } from '@shared/room-api/create-room-dto.interface';
import { RoomApiService } from '@shared/room-api/room-api.service';
import { Room } from '@shared/room-api/room.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  constructor(private router: Router, private roomApiService: RoomApiService) {}

  onSubmit(createRoomDto: CreateRoomDto): void {
    this.roomApiService.createRoom(createRoomDto).subscribe((room: Room) => {
      this.router.navigate(['room', room._id]);
    });
  }
}
