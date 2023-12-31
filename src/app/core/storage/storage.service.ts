import { Inject, Injectable } from '@angular/core';
import { windowToken } from '@core/window/window.token';
import { storageKeys } from './storage-keys.const';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public constructor(@Inject(windowToken) private window: Window) {}

  public setTheme(theme: string): void {
    this.setItem(storageKeys.theme, theme);
  }

  public getTheme(): string | null {
    return this.getItem(storageKeys.theme);
  }

  public saveLatestRoomId(roomId: string): void {
    this.setItem(storageKeys.latestRoomId, roomId);
  }

  public getLatestRoomId(): string | null {
    return this.getItem(storageKeys.latestRoomId);
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

  private getItem(key: string): string | null {
    return this.window.localStorage.getItem(key);
  }

  private setItem(key: string, value: string): void {
    return this.window.localStorage.setItem(key, value);
  }
}
