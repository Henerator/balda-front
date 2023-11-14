import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '@shared/controls/controls.module';
import { RoomApiModule } from '@shared/room-api/room-api.module';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { UiKitModule } from 'src/app/ui-kit/ui-kit.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MainPageRoutingModule,
    RoomApiModule,
    ControlsModule,

    UiKitModule,
  ],
})
export class MainPageModule {}
