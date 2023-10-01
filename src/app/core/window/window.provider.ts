import { ValueProvider } from '@angular/core';
import { windowToken } from './window.token';

export const windowProvider: ValueProvider = {
  provide: windowToken,
  useValue: window,
};
