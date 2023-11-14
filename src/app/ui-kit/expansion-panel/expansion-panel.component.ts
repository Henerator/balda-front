import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
})
export class ExpansionPanelComponent {
  @Input() public title = 'title';
  @Input() public set expanded(value: boolean) {
    this.showContent = value;
  }

  @HostBinding('class.expended')
  public showContent = false;
}
