import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CollectEffects } from './collect.effects';

describe('CollectEffects', () => {
  let actions$: Observable<any>;
  let effects: CollectEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CollectEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
