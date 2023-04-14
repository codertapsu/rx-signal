import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CombinedRxComponent } from '../combined-rx/combined-rx.component';
import { CombinedSignalComponent } from '../combined-signal/combined-signal.component';
import { FirstChildComponent } from '../first-child/first-child.component';
import { SecondChildComponent } from '../second-child/second-child.component';

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
  ],
})
export class HomeComponent {
  public isDisplayedSignal = true;
  public isDisplayedRx = true;

  public toggle(value: number): void {
    if (value === 1) {
      this.isDisplayedSignal = !this.isDisplayedSignal;
    } else {
      this.isDisplayedRx = !this.isDisplayedRx;
    }
  }
}
