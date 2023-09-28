import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  DoCheck,
  effect,
  inject,
  signal,
} from '@angular/core';
import { globalEvent } from '@shared/global-events';

@Component({
  selector: 'app-combined-signal',
  templateUrl: './combined-signal.component.html',
  styleUrls: ['./combined-signal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class CombinedSignalComponent implements DoCheck, AfterViewChecked {
  public readonly addOne$ = signal<number>(0);
  public readonly input$ = signal<number>(0);
  public readonly sum$ = computed(() => {
    return this.addOne$() + this.input$();
  });

  public readonly sub$ = effect(
    () => {
      console.log(
        `Sum has been changed to ${this.sum$()} - CombinedSignalComponent`
      );
    },
    { manualCleanup: false }
  );
  public readonly _ = inject(DestroyRef).onDestroy(() => {
    console.log('CombinedSignalComponent Side effect is destroying');
    this.sub$.destroy();
  });

  public ngAfterViewChecked(): void {
    console.log('CombinedSignalComponent CD performed');
  }

  public ngDoCheck(): void {
    console.log('CombinedSignalComponent DoCheck');
    // for (let index = 0; index < 10_000_000_000; index++) {}
    // console.log('Done');
  }

  public checked(): boolean {
    console.log('CombinedSignalComponent checked');
    return true;
  }

  public addOne(event: Event): void {
    globalEvent.emit('x', event, 1);
    this.addOne$.update((current) => current + 1);
  }

  public updateValue(event: Event): void {
    this.input$.set((event.target as HTMLInputElement).valueAsNumber);
  }
}
