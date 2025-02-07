import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"  
import { of } from "rxjs"
import { map, mergeMap, catchError, tap } from "rxjs/operators"
import * as CollectActions from "../actions/collect.actions"
import { CollectService } from "../../core/services/collect.service"

@Injectable()
export class CollectEffects {
  constructor(
    private actions$: Actions,
    private collectService: CollectService,
  ) {}

  loadRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectActions.loadCollectRequests),
      mergeMap(() =>
        this.collectService.getRequests().pipe(
          map((requests) => CollectActions.loadCollectRequestsSuccess({ requests })),
          catchError((error) => of(CollectActions.loadCollectRequestsFailure({ error }))),
        ),
      ),
    ),
  )

  addRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectActions.addCollectRequest),
      mergeMap((action) =>
        this.collectService.addRequest(action.request).pipe(
          map((request) => CollectActions.addCollectRequestSuccess({ request })),
          catchError((error) => of(CollectActions.addCollectRequestFailure({ error }))),
        ),
      ),
    ),
  )

  updateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectActions.updateCollectRequest),
      mergeMap((action) =>
        this.collectService.updateRequest(action.request).pipe(
          map((request) => CollectActions.updateCollectRequestSuccess({ request })),
          catchError((error) => of(CollectActions.updateCollectRequestFailure({ error }))),
        ),
      ),
    ),
  )

  deleteRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectActions.deleteCollectRequest),
      mergeMap((action) =>
        this.collectService.deleteRequest(action.id).pipe(
          map(() => CollectActions.deleteCollectRequestSuccess({ id: action.id })),
          catchError((error) => of(CollectActions.deleteCollectRequestFailure({ error }))),
        ),
      ),
    ),
  )
}

