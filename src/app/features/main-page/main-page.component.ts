import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectOption } from '@shared/controls/select/select-option.interface';
import { RoomApiService } from '@shared/room-api/room-api.service';
import { Room } from '@shared/room-api/room.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  public createForm = new FormGroup({
    size: new FormControl<number>(5),
    allowDiagonalLetter: new FormControl<boolean>(false),
  });

  public sizeOptions: SelectOption[] = [
    {
      name: '5x5 ячеек',
      value: 5,
    },
    {
      name: '6x6 ячеек',
      value: 6,
    },
  ];

  constructor(private router: Router, private roomApiService: RoomApiService) {}

  onSubmit(): void {
    this.roomApiService
      .createRoom(this.createForm.value)
      .subscribe((room: Room) => {
        this.router.navigate(['room', room._id]);
      });
  }
}
