import { Component, Inject, OnInit } from '@angular/core';
import { windowToken } from '@core/window/window.token';
import { ClipboardService } from '@shared/clipboard/clipboard.service';

@Component({
  selector: 'app-room-controls',
  templateUrl: './room-controls.component.html',
  styleUrls: ['./room-controls.component.scss'],
})
export class RoomControlsComponent implements OnInit {
  canShare = false;

  public constructor(
    private clipboardService: ClipboardService,
    @Inject(windowToken) private window: Window
  ) {}

  ngOnInit(): void {
    this.canShare = this.checkCanShare();
  }

  onCopyRoom() {
    this.clipboardService.copy(this.window.location.href);
  }

  onShare() {
    const data = this.getShareData();
    this.window.navigator.share(data);
  }

  private checkCanShare(): boolean {
    return (
      !!this.window.navigator.share &&
      this.window.navigator.canShare(this.getShareData())
    );
  }

  private getShareData(): ShareData {
    return {
      url: this.window.location.href,
    };
  }
}
