import { Component, Input } from '@angular/core';
import { RoomPlayer } from '@shared/room-api/room-player.interface';

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.scss'],
})
export class PlayerStatisticsComponent {
  @Input() public player!: RoomPlayer;
}
