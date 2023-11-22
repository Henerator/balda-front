import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { StorageService } from '@core/storage/storage.service';
import { windowToken } from '@core/window/window.token';
import { BehaviorSubject, Observable } from 'rxjs';
import { themeClasses } from './theme-classes.const';
import { Theme } from './theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeChange$: Observable<Theme>;

  private renderer: Renderer2;
  private htmlElement: HTMLElement;
  private themeChangeSubject = new BehaviorSubject<Theme>(Theme.dark);

  constructor(
    private storageService: StorageService,
    rendererFactory: RendererFactory2,
    @Inject(windowToken) window: Window
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.htmlElement = window.document.documentElement;
    this.themeChange$ = this.themeChangeSubject.asObservable();
  }

  setLightTheme(): void {
    this.setTheme(Theme.light);
  }

  setDarkTheme(): void {
    this.setTheme(Theme.dark);
  }

  public restoreSavedTheme(): void {
    const savedTheme = this.storageService.getTheme();
    if (savedTheme !== Theme.light && savedTheme !== Theme.dark) return;

    this.themeChangeSubject.next(savedTheme);
    this.applyTheme(savedTheme);
  }

  private setTheme(theme: Theme): void {
    this.applyTheme(theme);
    this.themeChangeSubject.next(theme);
    this.saveTheme(theme);
  }

  private applyTheme(theme: Theme): void {
    if (theme === Theme.light) {
      this.renderer.addClass(this.htmlElement, themeClasses.light);
      return;
    }

    this.renderer.removeClass(this.htmlElement, themeClasses.light);
  }

  private saveTheme(theme: Theme): void {
    this.storageService.setTheme(theme);
  }
}
