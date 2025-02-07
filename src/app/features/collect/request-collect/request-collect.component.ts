import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, EMPTY, filter, map, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { CollectRequest } from '../../../core/models/collect-request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as CollectActions from '../../../store/actions/collect.actions';

@Component({
  selector: "app-request-collect",
  templateUrl: "./request-collect.component.html",
  styleUrls: ["./request-collect.component.css"],
})
export class RequestCollectComponent implements OnInit {
  collectForm: FormGroup
  isModalOpen = false
  collectRequests$: Observable<CollectRequest[]>
  editingRequestId: number | null = null

  constructor(
    private fb: FormBuilder,
    private store: Store<{ collectRequests: CollectRequest[] }>,
  ) {
    this.collectForm = this.initForm()
    this.collectRequests$ = this.store.select("collectRequests")
  }

  ngOnInit(): void {
    this.loadRequests()
  }

  private initForm(): FormGroup {
    return this.fb.group({
      wasteType: ["", Validators.required],
      estimatedWeight: ["", [Validators.required, Validators.min(1), Validators.max(10)]],
      collectionAddress: ["", Validators.required],
      collectionDate: ["", Validators.required],
      startTime: ["", Validators.required],
      endTime: ["", Validators.required],
    })
  }

  loadRequests(): void {
    this.store.dispatch(CollectActions.loadCollectRequests())
  }

  openModal(): void {
    this.isModalOpen = true
    this.collectForm.reset()
    this.editingRequestId = null
  }

  closeModal(): void {
    this.isModalOpen = false
    this.collectForm.reset()
    this.editingRequestId = null
  }

  submitRequest(): void {
    if (this.collectForm.invalid) {
      this.collectForm.markAllAsTouched()
      return
    }

    const formValue = this.collectForm.value
    const request: CollectRequest = {
      id: this.editingRequestId || 0,
      userId: 1,
      wasteType: formValue.wasteType,
      estimatedWeight: formValue.estimatedWeight,
      collectionAddress: formValue.collectionAddress,
      collectionDate: new Date(formValue.collectionDate),
      timeSlot: `${formValue.startTime} - ${formValue.endTime}`,
      startTime: formValue.startTime,
      endTime: formValue.endTime,
      status: "en_attente",
    }

    this.collectRequests$
      .pipe(
        take(1),
        map((requests) => {
          const pendingRequests = requests.filter((r) => r.status === "en_attente")
          const totalWeight = pendingRequests.reduce((sum, r) => sum + r.estimatedWeight, 0)

          if (this.editingRequestId) {
            if (request.status !== "en_attente") {
              alert("Vous ne pouvez modifier que les demandes en attente.")
              return
            }
            this.store.dispatch(CollectActions.updateCollectRequest({ request }))
          } else {
            if (pendingRequests.length >= 3) {
              alert("Vous ne pouvez pas avoir plus de 3 demandes en attente.")
              return
            }

            if (totalWeight + request.estimatedWeight > 10) {
              alert("Le total des poids des demandes ne doit pas dépasser 10kg.")
              return
            }

            this.store.dispatch(CollectActions.addCollectRequest({ request }))
          }

          this.closeModal()
        }),
      )
      .subscribe()
  }

  editRequest(request: CollectRequest): void {
    if (request.status !== "en_attente") {
      alert("Vous ne pouvez modifier que les demandes en attente.")
      return
    }

    this.editingRequestId = request.id
    this.collectForm.patchValue({
      wasteType: request.wasteType,
      estimatedWeight: request.estimatedWeight,
      collectionAddress: request.collectionAddress,
      collectionDate: new Date(request.collectionDate).toISOString().split("T")[0],
      startTime: request.startTime,
      endTime: request.endTime,
    })

    this.isModalOpen = true
  }

  deleteRequest(id: number): void {
    this.collectRequests$
      .pipe(
        take(1),
        map((requests) => {
          const request = requests.find((r) => r.id === id)
          if (request && request.status !== "en_attente") {
            alert("Vous ne pouvez supprimer que les demandes en attente.")
            return
          }

          this.store.dispatch(CollectActions.deleteCollectRequest({ id }))
        }),
      )
      .subscribe()
  }
}

