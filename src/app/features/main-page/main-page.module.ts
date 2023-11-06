import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomApiModule } from '@shared/room-api/room-api.module';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainPageRoutingModule,
    RoomApiModule,
  ],
})
export class MainPageModule {}
