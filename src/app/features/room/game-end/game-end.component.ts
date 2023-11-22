import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '@shared/room-api/room.interface';

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.scss'],
})
export class GameEndComponent {
  @Input() room!: Room;
  @Input() matrix: string[][] = [];

  constructor(private router: Router) {}

  onCreateNewGame() {
    this.router.navigate(['/']);
  }
}
