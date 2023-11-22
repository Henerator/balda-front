import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@core/storage/storage.service';
import { CreateRoomDto } from '@shared/room-api/create-room-dto.interface';
import { RoomApiService } from '@shared/room-api/room-api.service';
import { Room } from '@shared/room-api/room.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public latestRoomId: string | null = null;

  constructor(
    private router: Router,
    private roomApiService: RoomApiService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadLatestRoomId();
  }

  onCreateFormSubmit(createRoomDto: CreateRoomDto): void {
    this.roomApiService.createRoom(createRoomDto).subscribe((room: Room) => {
      this.openRoom(room._id);
    });
  }

  onOpenLatestRoom() {
    this.openRoom(this.latestRoomId);
  }

  private loadLatestRoomId(): void {
    this.latestRoomId = this.storageService.getLatestRoomId();
  }

  private openRoom(roomId: string | null): void {
    this.router.navigate(['room', roomId]);
  }
}
