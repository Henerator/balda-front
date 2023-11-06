import { Inject, Injectable } from '@angular/core';
import { windowToken } from '@core/window/window.token';

@Injectable()
export class ClipboardService {
  public constructor(@Inject(windowToken) private window: Window) {}

  copy(text: string): void {
    const document = this.window.document;
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.top = '0';
    input.style.left = '0';
    input.style.background = 'transparent';
    input.setAttribute('value', text);

    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }
}
