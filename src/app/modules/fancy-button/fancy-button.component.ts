import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EnvironmentInjector, Injector, Input, OnChanges, SimpleChanges, inject } from '@angular/core';

@Component({
  selector: 'app-fancy-button',
  templateUrl: './fancy-button.component.html',
  styleUrls: ['./fancy-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class FancyButtonComponent implements OnChanges, AfterViewInit, DoCheck, AfterViewChecked {
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  
  public readonly fancyAppRef = inject(ApplicationRef);
  public readonly fancyInjector = inject(Injector);
  public readonly fancyEnvironmentInjector = inject(EnvironmentInjector);

  @Input() name = 'default';
  public loud(): void {
    console.log('Clicked from Fancy');
  }

  public checked(): boolean {
    console.log('FancyButtonComponent checked');
    return true;
  }

  public ngAfterViewInit(): void {
    // this._changeDetectorRef.markForCheck();
  }

  public ngAfterViewChecked(): void {
    console.log('FancyButtonComponent CD performed');
  }

  public ngDoCheck(): void {
    console.log('FancyButtonComponent DoCheck');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this._changeDetectorRef.markForCheck();
  }
}
