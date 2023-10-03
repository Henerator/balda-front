import { Inject, Injectable } from '@angular/core';
import { windowToken } from '@core/window/window.token';

@Injectable()
export class StorageService {
  public constructor(@Inject(windowToken) private readonly window: Window) {}

  public getItem(key: string): string | null {
    return this.window.localStorage.getItem(key);
  }

  public setItem(key: string, value: string): void {
    return this.window.localStorage.setItem(key, value);
  }

  public getObject<T>(key: string): T | null {
    const value = this.window.localStorage.getItem(key);

    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch (error: unknown) {
      return null;
    }
  }

  public setObject<T>(key: string, value: T): void {
    return this.window.localStorage.setItem(key, JSON.stringify(value));
  }
}
