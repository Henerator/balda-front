import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [CheckboxComponent, SelectComponent],
  exports: [CheckboxComponent, SelectComponent],
})
export class ControlsModule {}
