import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-combined-signal',
  templateUrl: './combined-signal.component.html',
  styleUrls: ['./combined-signal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class CombinedSignalComponent {
  public readonly addOne$ = signal<number>(0);
  public readonly input$ = signal<number>(0);
  public readonly sum$ = computed(() => {
    return this.addOne$() + this.input$();
  });

  public constructor() {
    const sub$ = effect(() => {
      console.log('Input has been changed from CombinedSignalComponent');
    });
    inject(DestroyRef).onDestroy(() => {
      console.log('CombinedSignalComponent Side effect is destroying');
      sub$.destroy();
    });
  }

  public addOne(): void {
    this.addOne$.update((current) => current + 1);
  }

  public updateValue(event: Event): void {
    this.input$.set((event.target as HTMLInputElement).valueAsNumber);
  }
}
