import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageModule } from '@shared/storage/storage.module';
import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';

@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StorageModule,
    RoomRoutingModule,
  ],
})
export class RoomModule {}
