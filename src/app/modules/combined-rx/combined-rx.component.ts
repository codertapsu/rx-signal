import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-combined-rx',
  templateUrl: './combined-rx.component.html',
  styleUrls: ['./combined-rx.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class CombinedRxComponent {
  public readonly addOne$ = new BehaviorSubject<number>(0);
  public readonly input$ = new BehaviorSubject<number>(0);
  public readonly sum$ = combineLatest([this.addOne$, this.input$]).pipe(
    map(([a, b]) => a + b)
  );

  public constructor() {
    const sub$ = this.input$.subscribe(() => {
      console.log('Input has been changed from CombinedRxComponent');
    });
    inject(DestroyRef).onDestroy(() => {
      console.log('CombinedRxComponent Side effect is destroying');
      sub$.unsubscribe();
    });
  }

  public addOne(): void {
    this.addOne$.next(this.addOne$.value + 1);
  }

  public updateValue(event: Event): void {
    this.input$.next((event.target as HTMLInputElement).valueAsNumber);
  }
}
