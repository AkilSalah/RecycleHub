import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectRequest } from '../../../core/models/collect-request.model';
import { User } from '../../../core/models/user.model';
import { Store } from '@ngrx/store';
import * as CollectActions from '../../../store/actions/collect.actions'

@Component({
  selector: 'app-collection-process',
  templateUrl: './collection-process.component.html',
  styleUrl: './collection-process.component.css'
})
export class CollectionProcessComponent {
  collectRequests$: Observable<CollectRequest[]>
  currentUser: User | null = null

  constructor(private store: Store<{ collectRequests: CollectRequest[] }>) {
    this.collectRequests$ = this.store.select((state) =>
      state.collectRequests.filter(
        (request) => request.collectionCity === this.currentUser?.city && request.status === "en_attente",
      ),
    )
    this.loadCurrentUser()
  }

  ngOnInit(): void {
    this.loadRequests()
  }

  private loadCurrentUser(): void {
    const userString = localStorage.getItem("currentUser")
    if (userString) {
      this.currentUser = JSON.parse(userString)
    }
  }

  loadRequests(): void {
    if (this.currentUser) {
      this.store.dispatch(CollectActions.loadCollectorRequests({ city: this.currentUser.city }))
    }
  }

  acceptRequest(requestId: number): void {
    if (this.currentUser) {
      this.store.dispatch(
        CollectActions.updateCollectRequest({
          request: { id: requestId, status: "occupée", userId: this.currentUser.id } as CollectRequest,
        }),
      )
    }
  }

  startCollection(requestId: number): void {
    this.store.dispatch(
      CollectActions.updateCollectRequest({
        request: { id: requestId, status: "en_cours" } as CollectRequest,
      }),
    )
  }

  finishCollection(requestId: number, status: "validée" | "rejetée"): void {
    if (requestId) {
      this.store.dispatch(
        CollectActions.updateCollectRequest({
          request: { id: requestId, status: status } as CollectRequest,
        }),
      )
    }
  }

  calculateTotalWeight(wasteItems: { estimatedWeight: number }[]): number {
    return wasteItems.reduce((total, item) => total + item.estimatedWeight, 0)
  }
}



