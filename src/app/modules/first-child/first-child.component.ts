import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-first-child',
  templateUrl: './first-child.component.html',
  styleUrls: ['./first-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class FirstChildComponent {
  public loud(): void {
    console.log('Clicked from First component');
  }

  public checked(): boolean {
    console.log('FirstChildComponent checked');
    return true;
  }
}
