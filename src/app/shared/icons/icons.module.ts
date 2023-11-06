import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconLoaderService } from './icon-loader.service';
import { IconComponent } from './icon/icon.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [IconComponent],
  providers: [IconLoaderService],
  exports: [IconComponent],
})
export class IconsModule {}
