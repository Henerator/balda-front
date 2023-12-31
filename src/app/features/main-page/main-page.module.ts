import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '@shared/controls/controls.module';
import { RoomApiModule } from '@shared/room-api/room-api.module';
import { ThemeTogglerModule } from '@shared/theme-toggler/theme-toggler.module';
import { UiKitModule } from 'src/app/ui-kit/ui-kit.module';
import { CreateFormComponent } from './create-form/create-form.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';

@NgModule({
  declarations: [MainPageComponent, CreateFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MainPageRoutingModule,
    RoomApiModule,
    ControlsModule,
    ThemeTogglerModule,

    UiKitModule,
  ],
})
export class MainPageModule {}
