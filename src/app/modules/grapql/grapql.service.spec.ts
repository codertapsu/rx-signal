import { TestBed } from '@angular/core/testing';

import { GrapqlService } from './grapql.service';

describe('GrapqlService', () => {
  let service: GrapqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrapqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
