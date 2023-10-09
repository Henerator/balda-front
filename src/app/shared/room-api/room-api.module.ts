import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RoomApiService } from './room-api.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [RoomApiService],
})
export class RoomApiModule {}
