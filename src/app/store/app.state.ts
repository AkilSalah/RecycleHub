import { CollectRequest } from '../core/models/collect-request.model';

export interface AppState {
  collectRequests: CollectRequest[]; 
}

export const initialState: AppState = {
  collectRequests: [], 
};