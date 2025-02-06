import { createReducer, on, State } from '@ngrx/store';
import { CollectRequest } from '../../core/models/collect-request.model';
import * as CollectActions from '../actions/collect.actions'

export const initialState: CollectRequest[] = JSON.parse(localStorage.getItem('collect_requests') || '[]');

const _collectReducer = createReducer(
  initialState,
  on(CollectActions.setCollectRequests, (state, { requests }) => [...requests]),

  on(CollectActions.addCollectRequest, (state, { request }) => {
    const newState = [...state, request];
    localStorage.setItem('collect_requests', JSON.stringify(newState));
    return newState;
  }),

  on(CollectActions.updateCollectRequest, (state, { request }) => {
    const newState = state.map(r => (r.id === request.id ? request : r));
    localStorage.setItem('collect_requests', JSON.stringify(newState));
    return newState;
  }),
  on(CollectActions.deleteCollectRequest, (state, { id }) => {
    const newState = state.filter(r => r.id !== id);
    localStorage.setItem('collect_requests', JSON.stringify(newState));
    return newState;
  })
);
export function collectReducer(state: any, action: any) {
  return _collectReducer(state, action);
}


