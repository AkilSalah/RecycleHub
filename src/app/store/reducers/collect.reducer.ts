import { createReducer, on } from '@ngrx/store';
import { CollectRequest } from '../../core/models/collect-request.model';
import * as CollectActions from '../actions/collect.actions';


export const initialState: CollectRequest[] = [];

export const collectReducer = createReducer(
  initialState,
  on(CollectActions.loadCollectRequestsSuccess, (_, { requests }) => [...requests]),
  on(CollectActions.addCollectRequestSuccess, (state, { request }) => [...state, request]),
  on(CollectActions.updateCollectRequestSuccess, (state, { request }) =>
    state.map(item => item.id === request.id ? request : item)
  ),
  on(CollectActions.deleteCollectRequestSuccess, (state, { id }) =>
    state.filter(item => item.id !== id)
  ),
  on(CollectActions.loadCollectorRequestsSuccess, (_, { requests }) => [...requests]),
  on(CollectActions.updateCollectRequestSuccess, (state, { request }) =>
    state.map((item) => (item.id === request.id ? request : item))
  ),
);