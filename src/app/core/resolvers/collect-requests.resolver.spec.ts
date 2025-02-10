import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { collectRequestsResolver } from './collect-requests.resolver';

describe('collectRequestsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => collectRequestsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
