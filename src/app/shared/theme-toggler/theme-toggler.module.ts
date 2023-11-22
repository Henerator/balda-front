import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '@shared/icons/icons.module';
import { ThemeTogglerComponent } from './theme-toggler.component';

@NgModule({
  imports: [CommonModule, IconsModule],
  declarations: [ThemeTogglerComponent],
  exports: [ThemeTogglerComponent],
})
export class ThemeTogglerModule {}
