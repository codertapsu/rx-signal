import { JsonPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit,
  AfterContentChecked,
  DoCheck,
  ViewChild,
  ElementRef,
  OnInit,
  inject,
  Renderer2,
  signal,
  NgZone,
  ApplicationRef,
  ViewChildren,
  ContentChild,
  Injector,
  EnvironmentInjector,
} from '@angular/core';

import { CombinedRxComponent } from '../combined-rx/combined-rx.component';
import { CombinedSignalComponent } from '../combined-signal/combined-signal.component';
import { FirstChildComponent } from '../first-child/first-child.component';
import { SecondChildComponent } from '../second-child/second-child.component';
import { FormsModule, NgModel } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { waitFor } from '../../shared/wait-scheduler';
import { FancyButtonComponent } from '../fancy-button/fancy-button.component';

interface User {
  name: string;
  age: number;
}

const fakeAsyncData = new Promise((res, rej) => {
  setTimeout(() => {
    res(100);
  }, 10000);
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FirstChildComponent,
    SecondChildComponent,
    CombinedSignalComponent,
    CombinedRxComponent,
    NgIf,
    FormsModule,
    JsonPipe,
  ],
})
export class HomeComponent
  implements
    OnInit,
    DoCheck,
    AfterViewInit,
    AfterViewChecked,
    AfterContentInit,
    AfterContentChecked
{
  private readonly _renderer = inject(Renderer2);
  private readonly _ngZone = inject(NgZone);
  private readonly _applicationRef = inject(ApplicationRef);

  @ViewChild('noopBtn', { static: true })
  public readonly _noopBtnRef!: ElementRef<HTMLElement>;

  public readonly counter = signal(0);

  public isDisplayedSignal = true;
  public isDisplayedRx = true;
  public user: User = {
    name: 'Khanh',
    age: 26,
  };
  counterOutside: number = 0;

  public readonly homeAppRef = inject(ApplicationRef);
  public readonly homeInjector = inject(Injector);
  public readonly homeEnvironmentInjector = inject(EnvironmentInjector);

  public constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    // this._renderer.listen(this._noopBtnRef.nativeElement, 'click', () => {
    //   this.counter.update(value => value + 1);
    // })
    // this._ngZone.runOutsideAngular(() => {
    //   fromEvent(this._noopBtnRef.nativeElement, 'click').subscribe(() => {
    //     setInterval(() => {
    //       this.counter.update((value) => value + 1);
    //       this.counterOutside++;
    //     }, 1000);
    //   });
    // });
    // console.info('start init home');

    // const x = waitFor(fakeAsyncData);
    // console.info('done init home ', x);
  }

  public ngAfterViewInit(): void {
    // console.log('HomeComponent ngAfterViewInit not implemented.');
  }

  public ngAfterViewChecked(): void {
    // console.log('HomeComponent ngAfterViewChecked not implemented.');
  }

  public ngAfterContentInit(): void {
    // console.log('ngAfterContentInit not implemented.');
  }

  public ngAfterContentChecked(): void {
    // console.log('ngAfterContentChecked not implemented.');
  }

  public ngDoCheck(): void {
    console.log('Home DoCheck');
    // for (let index = 0; index < 10_000_000_000; index++) {}
    // console.log('Home DoCheck Done');
  }

  public toggle(value: number): void {
    if (value === 1) {
      this.isDisplayedSignal = !this.isDisplayedSignal;
    } else {
      this.isDisplayedRx = !this.isDisplayedRx;
    }
  }

  public reassign(): void {
    this.user = {
      name: this.user.name,
      age: this.user.age,
    };
  }

  public detach(): void {
    this._changeDetectorRef.detach();
  }

  public reattach(): void {
    this._changeDetectorRef.reattach();
  }

  public markForCheck(): void {
    this._changeDetectorRef.markForCheck();
  }

  public appTick(): void {
    this._applicationRef.tick();
  }

  public detectChanges(): void {
    this._changeDetectorRef.detectChanges();
  }

  public triggerNoop(): void {
    setInterval(() => {
      this.counter.update((value) => value + 1);
    }, 1000);
  }

  public checked(): boolean {
    console.log('HomeComponent checked');
    return true;
  }

  public doCustomEvent(event: unknown): void {
    console.log(event);
  }
}
