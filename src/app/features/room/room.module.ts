import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LetterModule } from '@shared/letter/letter.module';
import { LoaderModule } from '@shared/loader/loader.module';
import { StorageModule } from '@shared/storage/storage.module';
import { FieldCellComponent } from './field-cell/field-cell.component';
import { GameEndComponent } from './game-end/game-end.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { JoinFormComponent } from './join-form/join-form.component';
import { PlayerStatisticsComponent } from './player-statistics/player-statistics.component';
import { RoomFieldComponent } from './room-field/room-field.component';
import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';

@NgModule({
  declarations: [
    RoomComponent,
    JoinFormComponent,
    RoomFieldComponent,
    FieldCellComponent,
    PlayerStatisticsComponent,
    GamePlayComponent,
    GameEndComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    StorageModule,
    LoaderModule,
    LetterModule,

    RoomRoutingModule,
  ],
})
export class RoomModule {}
