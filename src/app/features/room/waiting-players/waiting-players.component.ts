import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-waiting-players',
  templateUrl: './waiting-players.component.html',
  styleUrls: ['./waiting-players.component.scss'],
})
export class WaitingPlayersComponent {
  @Input() public matrix: string[][] = [];
}
