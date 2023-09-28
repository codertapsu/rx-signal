import { EventEmitter } from 'events';
import { interval, timer } from 'rxjs';

type Listener = (...args: any[]) => void;

export const globalEvent = new EventEmitter();
globalEvent.setMaxListeners(100);

export const OnEvent =
  (eventName: string | symbol) =>
  (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const listener: Listener = (...args: unknown[]) => {
      descriptor.value(...args);
    };
    globalEvent.on(eventName, listener);
    const originalDestroyMethod = (target as any).ngOnDestroy as VoidFunction;
    (target as any).ngOnDestroy = function () {
      globalEvent.off(eventName, listener);
      console.log('remove event');

      if (originalDestroyMethod) {
        originalDestroyMethod.call(this);
      }
    };
  };

export const Interval =
  (intervalDuration: number) =>
  (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const subscription = timer(0, intervalDuration).subscribe(() => {
      descriptor.value();
    });
    const originalDestroyMethod = (target as any).ngOnDestroy as VoidFunction;
    (target as any).ngOnDestroy = function () {
      subscription.unsubscribe();
      if (originalDestroyMethod) {
        originalDestroyMethod.call(this);
      }
    };
  };
