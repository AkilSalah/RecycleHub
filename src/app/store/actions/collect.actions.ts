import { createAction, props } from '@ngrx/store';
import { CollectRequest } from '../../core/models/collect-request.model';
export const loadCollectRequests = createAction("[Collect] Load Requests")
export const loadCollectRequestsSuccess = createAction(
  "[Collect] Load Requests Success",
  props<{ requests: CollectRequest[] }>(),
)
export const loadCollectRequestsFailure = createAction("[Collect] Load Requests Failure", props<{ error: any }>())

export const addCollectRequest = createAction("[Collect] Add Request", props<{ request: CollectRequest }>())
export const addCollectRequestSuccess = createAction(
  "[Collect] Add Request Success",
  props<{ request: CollectRequest }>(),
)
export const addCollectRequestFailure = createAction("[Collect] Add Request Failure", props<{ error: any }>())

export const updateCollectRequest = createAction("[Collect] Update Request", props<{ request: CollectRequest }>())
export const updateCollectRequestSuccess = createAction(
  "[Collect] Update Request Success",
  props<{ request: CollectRequest }>(),
)
export const updateCollectRequestFailure = createAction("[Collect] Update Request Failure", props<{ error: any }>())

export const deleteCollectRequest = createAction("[Collect] Delete Request", props<{ id: number }>())
export const deleteCollectRequestSuccess = createAction("[Collect] Delete Request Success", props<{ id: number }>())
export const deleteCollectRequestFailure = createAction("[Collect] Delete Request Failure", props<{ error: any }>())