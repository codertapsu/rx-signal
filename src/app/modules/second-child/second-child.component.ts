import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FancyButtonComponent } from '../fancy-button/fancy-button.component';

@Component({
  selector: 'app-second-child',
  templateUrl: './second-child.component.html',
  styleUrls: ['./second-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FancyButtonComponent],
})
export class SecondChildComponent {
  public loud(): void {
    console.log('Clicked from Second component');
  }

  public checked(): boolean {
    console.log('SecondChildComponent checked');
    return true;
  }
}
