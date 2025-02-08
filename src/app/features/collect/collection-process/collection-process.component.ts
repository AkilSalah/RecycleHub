import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectRequest } from '../../../core/models/collect-request.model';
import { User } from '../../../core/models/user.model';
import { Store } from '@ngrx/store';
import * as CollectActions from '../../../store/actions/collect.actions'
import { UserService } from '../../../core/services/user.service';
import { CollectService } from '../../../core/services/collect.service';
@Component({
  selector: 'app-collection-process',
  templateUrl: './collection-process.component.html',
  styleUrls: ['./collection-process.component.css']
})


export class CollectionProcessComponent {
  collectRequests$: Observable<CollectRequest[]>;
  currentUser: User | null = null;

  constructor(
    private store: Store<{ collectRequests: CollectRequest[] }>,
  ) {
    this.collectRequests$ = this.store.select((state) => state.collectRequests);
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    if (this.currentUser && this.currentUser.role === 'collecteur') {
      this.loadRequests(this.currentUser.city);
    }
  }

  private loadCurrentUser(): void {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    this.currentUser = user;
    // console.log(user.city)
    if (user && user.role === 'collecteur') {
      this.loadRequests(user.city);
    }
  }

  loadRequests(city: string): void {
    this.store.dispatch(CollectActions.loadCollectorRequests({ city }));
  }

  acceptRequest(requestId: number): void {
    this.store.dispatch(CollectActions.updateCollectRequestStatus({ requestId, status: "occupée" }));
  }

  startCollection(requestId: number): void {
    this.store.dispatch(CollectActions.updateCollectRequestStatus({ requestId, status: "en_cours" }));
  }

  finishCollection(requestId: number, status: "validée" | "rejetée"): void {
    this.store.dispatch(CollectActions.updateCollectRequestStatus({ requestId, status }));
  }

  calculateTotalWeight(wasteItems: { estimatedWeight: number }[]): number {
    return wasteItems.reduce((total, item) => total + item.estimatedWeight, 0);
  }
}
