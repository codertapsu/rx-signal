import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      [
        {
          path: '',
          loadComponent: () =>
            import('./modules/home/home.component').then(
              (m) => m.HomeComponent
            ),
        },
      ],
      withComponentInputBinding()
    ),
    provideClientHydration(),
  ],
};
