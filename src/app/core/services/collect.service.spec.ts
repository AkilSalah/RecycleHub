import { TestBed } from '@angular/core/testing';

import { CollectService } from './collect.service';

describe('CollectService', () => {
  let service: CollectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
