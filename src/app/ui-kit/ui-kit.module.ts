import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ExpansionPanelComponent],
  exports: [ExpansionPanelComponent],
})
export class UiKitModule {}
