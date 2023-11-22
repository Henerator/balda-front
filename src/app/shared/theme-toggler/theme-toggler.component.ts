import { Component, OnDestroy, OnInit } from '@angular/core';
import { Theme } from '@core/theme/theme.enum';
import { ThemeService } from '@core/theme/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-toggler',
  templateUrl: './theme-toggler.component.html',
})
export class ThemeTogglerComponent implements OnInit, OnDestroy {
  theme: Theme | null = null;

  private themeSubscription?: Subscription;

  public constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
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
}
