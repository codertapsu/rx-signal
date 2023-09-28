import { ApplicationConfig, NgZone, ɵNoopNgZone, Injectable } from '@angular/core';
import { EVENT_MANAGER_PLUGINS, provideClientHydration, EventManager } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';

@Injectable()
export class ZonelessEventPluginService {
 public manager!: EventManager;

  supports(eventName: string): boolean {
    return eventName.endsWith("kick");
  }

  addEventListener(
    element: HTMLElement,
    eventName: string,
    originalHandler: EventListener
  ): Function {
    // const [nativeEventName] = eventName.split(".");

    this.manager.getZone().runOutsideAngular(() => {
      element.addEventListener(eventName, originalHandler);
    });

    return () => element.removeEventListener(eventName, originalHandler);
  }
}


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
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: ZonelessEventPluginService,
      multi: true
    },
    // {
    //   provide: NgZone,
    //   useClass: ɵNoopNgZone,
    //   // useValue: new NgZone({ shouldCoalesceEventChangeDetection: false }),
    // }
  ],
};
