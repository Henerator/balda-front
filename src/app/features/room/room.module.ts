import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageModule } from '@shared/storage/storage.module';
import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { FieldCellComponent } from './field-cell/field-cell.component';
import { JoinFormComponent } from './join-form/join-form.component';
import { RoomFieldComponent } from './room-field/room-field.component';
import { PlayerStatisticsComponent } from './player-statistics/player-statistics.component';

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
    RoomRoutingModule,
  ],
})
export class RoomModule {}
