import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fancy-button',
  templateUrl: './fancy-button.component.html',
  styleUrls: ['./fancy-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class FancyButtonComponent {
  public loud(): void {
    console.log('Clicked from Fancy');
  }

  public checked(): boolean {
    console.log('FancyButtonComponent checked');
    return true;
  }
}
