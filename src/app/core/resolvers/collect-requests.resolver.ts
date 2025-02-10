import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { CollectRequest } from '../models/collect-request.model';
import { loadCollectRequests, loadCollectorRequests } from '../../store/actions/collect.actions';
import { AppState } from '../../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class RequestCollectResolver implements Resolve<CollectRequest[]> {
  constructor(private store: Store<AppState>) {}

  resolve(): Observable<CollectRequest[]> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (currentUser) {
      if (currentUser.role === 'particulier') {
        this.store.dispatch(loadCollectRequests());
        return this.store.select('collectRequests').pipe(
          take(1),
          map((requests: CollectRequest[]) => requests.filter((req: CollectRequest) => req.userId === currentUser.id)),
          catchError(() => {
            console.error('Erreur lors du chargement des demandes de collecte.');
            return of([]); 
          })
        );
      } else if (currentUser.role === 'collecteur') {
        this.store.dispatch(loadCollectorRequests({ city: currentUser.city }));
        return this.store.select('collectRequests').pipe(
          take(1),
          catchError(() => {
            console.error('Erreur lors du chargement des demandes de collecte.');
            return of([]); 
          })
        );
      }
    }
    return of([]);
  }
}