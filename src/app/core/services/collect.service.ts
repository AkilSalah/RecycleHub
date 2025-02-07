import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { CollectRequest } from '../models/collect-request.model';


@Injectable({
  providedIn: "root",
})
export class CollectService {
  private STORAGE_KEY = "collect_requests"

  getRequests(): Observable<CollectRequest[]> {
    const data = localStorage.getItem(this.STORAGE_KEY)
    const requests = data ? JSON.parse(data) : []
    return of(requests)
  }

  addRequest(request: CollectRequest): Observable<CollectRequest> {
    return this.getRequests().pipe(
      map((requests) => {
        const newRequest = { ...request, id: this.generateId(requests) }
        const updatedRequests = [...requests, newRequest]
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedRequests))
        return newRequest
      }),
      tap((savedRequest) => console.log("Requête sauvegardée:", savedRequest)),
    )
  }

  updateRequest(request: CollectRequest): Observable<CollectRequest> {
    return this.getRequests().pipe(
      map((requests) => {
        const updatedRequests = requests.map((r) => (r.id === request.id ? request : r))
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedRequests))
        return request
      }),
      tap((updatedRequest) => console.log("Requête mise à jour:", updatedRequest)),
    )
  }

  deleteRequest(id: number): Observable<void> {
    return this.getRequests().pipe(
      map((requests) => {
        const updatedRequests = requests.filter((r) => r.id !== id)
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedRequests))
      }),
      tap(() => console.log("Requête supprimée:", id)),
    )
  }

  private generateId(requests: CollectRequest[]): number {
    return requests.length > 0 ? Math.max(...requests.map((r) => r.id)) + 1 : 1
  }
}

