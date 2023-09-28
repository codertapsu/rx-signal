import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { FancyButtonComponent } from '../fancy-button/fancy-button.component';

@Component({
  selector: 'app-second-child',
  templateUrl: './second-child.component.html',
  styleUrls: ['./second-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FancyButtonComponent],
})
export class SecondChildComponent implements OnInit {
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  public user = {
    info: {
      name: 'Khanh'
    }
  };
  public loud(): void {
    console.log('Clicked from Second component');
    // this.name = 'Test2';
    this.user.info.name = 'Vuong';
    this._changeDetectorRef.detectChanges();
  }

  public ngAfterViewChecked(): void {
    console.log('SecondChildComponent CD performed');
  }

  public ngDoCheck(): void {
    console.log('SecondChildComponent DoCheck');
  }
  
  public ngOnInit(): void {
    console.log('Second ngOnInit');
    
    // this._changeDetectorRef.detectChanges();
  }

  public checked(): boolean {
    console.log('SecondChildComponent checked');
    return true;
  }
}
