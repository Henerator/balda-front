import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '@shared/loader/loader.module';
import { StorageModule } from '@shared/storage/storage.module';
import { LetterModule } from '../letter/letter.module';
import { FieldCellComponent } from './field-cell/field-cell.component';
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
