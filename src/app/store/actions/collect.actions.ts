import { createAction, props } from '@ngrx/store';
import { CollectRequest } from '../../core/models/collect-request.model';

export const addCollectRequest = createAction(
  '[Collect] Add Request',
  props<{ request: CollectRequest }>()
);
export const loadCollectRequests = createAction(
  '[Collect] Load Requests'
);
export const setCollectRequests = createAction(
  '[Collect] Set Requests',
  props<{ requests: CollectRequest[] }>()
);

export const updateCollectRequest = createAction(
  '[Collect] Update Request',
  props<{ request: CollectRequest }>()
);

export const deleteCollectRequest = createAction(
  '[Collect] Delete Request',
  props<{ id: number }>()
);

