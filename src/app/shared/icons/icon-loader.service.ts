import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable()
export class IconLoaderService {
  private readonly cachedIcons$ = new Map<string, Observable<string>>();

  constructor(private http: HttpClient) {}

  loadIcon(path: string): Observable<string> {
    if (!this.cachedIcons$.has(path)) {
      this.cachedIcons$.set(
        path,
        this.http.get(path, { responseType: 'text' }).pipe(shareReplay(1))
      );
    }

    return this.cachedIcons$.get(path)!;
  }
}
