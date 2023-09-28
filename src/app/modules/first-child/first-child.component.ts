import { JsonPipe, NgIf } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  Input,
  inject,
} from '@angular/core';

interface User {
  name: string;
  age: number;
}

type Constructor<T = any> = new (...args: any[]) => T;
// type Constructor<Class, Args extends any[] = any[]> = new (...args: Args) => Class;

export const classDecorator = <T extends Constructor<any>>() => {
  return (ctor: T): T => {
    console.log('addFuel2');

    return class extends ctor {
      public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
      // Also tried using "implements" with my type to help the typechecker, but failed miserably
      constructor(...args: any[]) {
        super(...args);
      }

      // public triggerCustomEvent(): void {
      //   this._elementRef.nativeElement.dispatchEvent(
      //     new CustomEvent('kick', { detail: '1' })
      //   );
      // }

      // fuel = 1000;
    };
  };
};

@Component({
  selector: 'app-first-child',
  templateUrl: './first-child.component.html',
  styleUrls: ['./first-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [JsonPipe, NgIf],
})
@classDecorator()
export class FirstChildComponent implements DoCheck, AfterViewChecked {
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  @Input({ required: true }) user!: User;

  public loud(): void {
    console.log('Clicked from First component');
  }

  public checked(): boolean {
    console.log('FirstChildComponent checked');
    return true;
  }

  public ngAfterViewChecked(): void {
    // console.log('FirstChildComponent CD performed');
  }

  public ngDoCheck(): void {
    // console.log('FirstChildComponent DoCheck');
    // this._changeDetectorRef.markForCheck();
    // console.log('FC DoCheck');
    // for (let index = 0; index < 10_000_000_000; index++) {}
    // console.log('FC DoCheck Done');
  }

  public markForCheck(): void {
    this._changeDetectorRef.markForCheck();
  }

  public detectChanges(): void {
    this._changeDetectorRef.detectChanges();
  }

  public triggerCustomEvent(): void {
    // this._elementRef.nativeElement.dispatchEvent(
    //   new CustomEvent('kick', { detail: '1' })
    // );
  }
}
