import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomApiModule } from '@shared/room-api/room-api.module';
import { CreateRoomRoutingModule } from './create-room-routing.module';
import { CreateRoomComponent } from './create-room.component';

@NgModule({
  declarations: [CreateRoomComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CreateRoomRoutingModule,
    RoomApiModule,
  ],
})
export class CreateRoomModule {}
