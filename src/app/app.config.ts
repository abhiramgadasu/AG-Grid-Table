import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
