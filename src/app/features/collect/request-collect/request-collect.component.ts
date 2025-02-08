import { Component, OnInit } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { CollectRequest, WasteItem } from '../../../core/models/collect-request.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  currentUser: { id: number } | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ collectRequests: CollectRequest[] }>,
  ) {
    this.collectForm = this.initForm()
    
    this.collectRequests$ = this.store.select("collectRequests").pipe(
      map(reqs => reqs.filter(req => req.userId === this.currentUser!.id))
    )

  }

  ngOnInit(): void {
    console.log(this.collectRequests$)
    this.loadCurrentUser()
    this.loadRequests()
  }

  private initForm(): FormGroup {
    return this.fb.group({
      wasteItems: this.fb.array([this.createWasteItemForm()]),
      collectionAddress: ["", Validators.required],
      collectionDate: ["", Validators.required],
      startTime: ["", Validators.required],
      endTime: ["", Validators.required],
      collectionCity: ["", Validators.required],
    })
  }
  private loadCurrentUser(): void {
    const userString = localStorage.getItem("currentUser")
    if (userString) {
      this.currentUser = JSON.parse(userString)
      console.log(this.currentUser)
    }
  }
  private createWasteItemForm(): FormGroup {
    return this.fb.group({
      wasteType: ["", Validators.required],
      estimatedWeight: ["", [Validators.required, Validators.min(1), Validators.max(10000)]],
    })
  }

  get wasteItems() {
    return this.collectForm.get("wasteItems") as FormArray
  }

  addWasteItem() {
    if (this.wasteItems.length < 3) {
      this.wasteItems.push(this.createWasteItemForm())
    }
  }

  removeWasteItem(index: number) {
    if (this.wasteItems.length > 1) {
      this.wasteItems.removeAt(index)
    }
  }

  loadRequests(): void {
    this.store.dispatch(CollectActions.loadCollectRequests())
    
  }

  openModal(): void {
    this.isModalOpen = true
    this.collectForm.reset()
    this.editingRequestId = null
    while (this.wasteItems.length > 1) {
      this.wasteItems.removeAt(1)
    }
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
    const wasteItems: WasteItem[] = formValue.wasteItems.map((item: any) => ({
      wasteType: item.wasteType,
      estimatedWeight: item.estimatedWeight,
    }))

    const totalWeight = wasteItems.reduce((sum, item) => sum + item.estimatedWeight, 0)

    if (totalWeight > 10000) {
      alert("Le poids total des déchets ne doit pas dépasser 10 kg.")
      return
    }
    if (!this.currentUser || !this.currentUser.id) {
      alert("Aucun utilisateur authentifié.");
      return;
    }
    const request: CollectRequest = {
      id: this.editingRequestId || 0,
      userId: this.currentUser.id,
      wasteItems: wasteItems,
      collectionAddress: formValue.collectionAddress,
      collectionDate: new Date(formValue.collectionDate),
      timeSlot: `${formValue.startTime} - ${formValue.endTime}`,
      startTime: formValue.startTime,
      collectionCity: formValue.collectionCity,
      endTime: formValue.endTime,
      status: "en_attente",
    }

    if (this.editingRequestId) {
      this.store.dispatch(CollectActions.updateCollectRequest({ request }))
    } else {
      this.store.dispatch(CollectActions.addCollectRequest({ request }))
    }

    this.closeModal()
  }

  editRequest(request: CollectRequest): void {
    if (request.status !== "en_attente") {
      alert("Vous ne pouvez modifier que les demandes en attente.")
      return
    }

    this.editingRequestId = request.id
    while (this.wasteItems.length > 0) {
      this.wasteItems.removeAt(0)
    }
    request.wasteItems.forEach((item) => {
      this.wasteItems.push(
        this.fb.group({
          wasteType: [item.wasteType, Validators.required],
          estimatedWeight: [item.estimatedWeight, [Validators.required, Validators.min(1), Validators.max(10000)]],
        }),
      )
    })

    this.collectForm.patchValue({
      collectionAddress: request.collectionAddress,
      collectionDate: new Date(request.collectionDate).toISOString().split("T")[0],
      startTime: request.startTime,
      endTime: request.endTime,
      collectionCity: request.collectionCity
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