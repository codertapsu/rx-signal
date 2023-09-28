import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  DoCheck,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { BehaviorSubject, combineLatest, interval, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { OnEvent } from '@shared/global-events';

@Component({
  selector: 'app-combined-rx',
  templateUrl: './combined-rx.component.html',
  styleUrls: ['./combined-rx.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class CombinedRxComponent implements DoCheck, AfterViewChecked {
  // private readonly _subscriptions: Subscription[] = [];
  private readonly _color = 'red';

  public readonly addOne$ = new BehaviorSubject<number>(0);
  public readonly input$ = new BehaviorSubject<number>(0);
  public readonly sum$ = combineLatest([this.addOne$, this.input$]).pipe(
    map(([a, b]) => a + b)
  );

  public readonly sub$ = this.sum$.subscribe((sum) => {
    console.log(`Sum has been changed to ${sum} - CombinedRxComponent`);
  });
  public readonly _ = inject(DestroyRef).onDestroy(() => {
    console.log('CombinedRxComponent Side effect is destroying');
    this.sub$.unsubscribe();
  });

  public ngAfterViewChecked(): void {
    console.log('CombinedRxComponent CD performed');
  }

  public ngDoCheck(): void {
    console.log('CombinedRxComponent DoCheck');
  }

  // public ngOnInit(): void {
  //   const interval$ = interval(1000);
  //   const subscription = interval$.pipe().subscribe((r) => {});
  //   // manually keep track of the subscriptions in a subscription array
  //   this._subscriptions.push(subscription);
  // }

  // public ngOnDestroy(): void {
  //   // when the component get's destroyed, unsubscribe all the subscriptions
  //   console.log('Destroying _subscriptions');

  //   this._subscriptions.forEach((sub) => sub.unsubscribe());
  // }

  public checked(): boolean {
    console.log('CombinedRxComponent checked');
    return true;
  }

  public addOne(event: Event): void {
    this.addOne$.next(this.addOne$.value + 1);
  }

  @OnEvent('x')
  public updateValue(event: Event, color: any): void {
    console.log('trigger by event', event, color);

    // this.input$.next((event.target as HTMLInputElement).valueAsNumber);
  }
}
