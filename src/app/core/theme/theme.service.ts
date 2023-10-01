import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
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
    rendererFactory: RendererFactory2,
    @Inject(windowToken) readonly window: Window
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.htmlElement = window.document.documentElement;
    this.themeChange$ = this.themeChangeSubject.asObservable();
  }

  setLightTheme(): void {
    this.renderer.addClass(this.htmlElement, themeClasses.light);
    this.themeChangeSubject.next(Theme.light);
  }

  setDarkTheme(): void {
    this.renderer.removeClass(this.htmlElement, themeClasses.light);
    this.themeChangeSubject.next(Theme.dark);
  }
}
