import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Theme } from '@core/theme/theme.enum';
import { ThemeService } from '@core/theme/theme.service';
import { windowToken } from '@core/window/window.token';
import { ClipboardService } from '@shared/clipboard/clipboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-controls',
  templateUrl: './room-controls.component.html',
  styleUrls: ['./room-controls.component.scss'],
})
export class RoomControlsComponent implements OnInit, OnDestroy {
  theme: Theme | null = null;
  canShare = false;

  private themeSubscription?: Subscription;

  public constructor(
    private themeService: ThemeService,
    private clipboardService: ClipboardService,
    @Inject(windowToken) private window: Window
  ) {}

  ngOnInit(): void {
    this.canShare = this.checkCanShare();
    this.themeSubscription = this.themeService.themeChange$.subscribe(
      (theme) => (this.theme = theme)
    );
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }

  onThemeToggle(): void {
    if (this.theme === Theme.light) {
      this.themeService.setDarkTheme();
      return;
    }

    this.themeService.setLightTheme();
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
