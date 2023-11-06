import { Component, OnDestroy, OnInit } from '@angular/core';
import { Theme } from '@core/theme/theme.enum';
import { ThemeService } from '@core/theme/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-controls',
  templateUrl: './room-controls.component.html',
  styleUrls: ['./room-controls.component.scss'],
})
export class RoomControlsComponent implements OnInit, OnDestroy {
  theme: Theme | null = null;

  private subscription?: Subscription;

  public constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.subscription = this.themeService.themeChange$.subscribe(
      (theme) => (this.theme = theme)
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onThemeToggle(): void {
    if (this.theme === Theme.light) {
      this.themeService.setDarkTheme();
      return;
    }

    this.themeService.setLightTheme();
  }
}
