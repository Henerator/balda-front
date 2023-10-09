import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageModule } from '@shared/storage/storage.module';
import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { FieldCellComponent } from './field-cell/field-cell.component';

@NgModule({
  declarations: [RoomComponent, FieldCellComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StorageModule,
    RoomRoutingModule,
  ],
})
export class RoomModule {}
