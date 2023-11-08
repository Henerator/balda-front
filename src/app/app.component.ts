import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@core/theme/theme.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.restoreSavedTheme();
  }
}
