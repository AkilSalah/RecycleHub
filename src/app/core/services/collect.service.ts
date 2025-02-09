import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { CollectRequest, WasteItem } from '../models/collect-request.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: "root",
})
export class CollectService {
   STORAGE_KEY = "collect_requests"

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

  getRequestsByCity(city: string): Observable<CollectRequest[]> {
    return this.getRequests().pipe(map((requests) => requests.filter((request) => request.collectionCity === city)))
  }

  updateRequestStatus(requestId: number, status: CollectRequest["status"]): Observable<CollectRequest> {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  
    return this.getRequests().pipe(
      map((requests) => {
        const updatedRequests = requests.map((request) =>
          request.id === requestId
            ? { 
                ...request, 
                status, 
                collectorId: currentUser?.role === 'collecteur' ? currentUser.id : request.collectorId,
                points: status === "validée" ? this.calculatePoints(request.wasteItems) : request.points 
              }
            : request
        );
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedRequests));
        const updatedRequest = updatedRequests.find((r) => r.id === requestId);
        if (!updatedRequest) {
          throw new Error("Request not found");
        }
        return updatedRequest;
      }),
      tap((updatedRequest) => console.log("Statut de la requête mis à jour:", updatedRequest)),
    );
  }
  
  calculatePoints(wasteItems: WasteItem[]): number {
    return wasteItems.reduce((total, item) => {
      const weightInKg = item.estimatedWeight / 1000; 
      switch (item.wasteType) {
        case 'plastique':
          return total + weightInKg * 2; 
        case 'verre':
          return total + weightInKg * 1; 
        case 'papier':
          return total + weightInKg * 1; 
        case 'metal':
          return total + weightInKg * 5;
        default:
          console.warn(`Type de déchet non reconnu: ${item.wasteType}`);
          return total; 
      }
    }, 0);
  }
  
  updateUserPoints(userId: number, points: number): Observable<User> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((user: User) =>
      user.id === userId ? { ...user, points: (user.points || 0) + points } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    const updatedUser = updatedUsers.find((u: User) => u.id === userId);
    return of(updatedUser);
  }
  
  convertPointsToVoucher(userId: number, points: number): Observable<{ user: User; voucherAmount: number }> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.id === userId);
  
    if (!user || user.points < points) {
      throw new Error("Points insuffisants");
    }
  
    let voucherAmount = 0;
    if (points === 500) {
      voucherAmount = 350;
    } else if (points === 200) {
      voucherAmount = 120;
    } else if (points === 100) {
      voucherAmount = 50;
    } else {
      throw new Error("Points insuffisants pour un bon d'achat");
    }
  
    const updatedUsers = users.map((u: User) =>
      u.id === userId ? { ...u, points: u.points - points } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  
    const updatedUser = updatedUsers.find((u: User) => u.id === userId);
    return of({ user: updatedUser, voucherAmount });
  }
}