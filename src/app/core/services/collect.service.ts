import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CollectRequest } from '../models/collect-request.model';

@Injectable({
  providedIn: 'root'
})

export class CollectService {
  private STORAGE_KEY = 'collect_requests';
  constructor() { }


  getRequests(): Observable<CollectRequest[]> {
    const requests = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    return of(requests);
  }

  addRequest(request: CollectRequest): Observable<void> {
    const requests = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    request.id = Date.now();
    requests.push(request);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(requests));
    return of(void 0);
  }

  updateRequest(request: CollectRequest): Observable<void> {
    let requests = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    requests = requests.map((r: CollectRequest) => 
      r.id === request.id ? request : r
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(requests));
    return of(void 0);
  }

  deleteRequest(id: number): Observable<void> {
    let requests = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    requests = requests.filter((r: CollectRequest) => r.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(requests));
    return of(void 0);
  }
}
