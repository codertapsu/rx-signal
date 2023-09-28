import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapqlComponent } from './grapql.component';

describe('GrapqlComponent', () => {
  let component: GrapqlComponent;
  let fixture: ComponentFixture<GrapqlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GrapqlComponent]
    });
    fixture = TestBed.createComponent(GrapqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
