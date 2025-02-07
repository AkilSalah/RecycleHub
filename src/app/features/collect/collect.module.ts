import { NgModule } from '@angular/core';
import { RequestCollectComponent } from './request-collect/request-collect.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { collectReducer } from '../../store/reducers/collect.reducer';
import { CollectEffects } from '../../store/effects/collect.effects';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import {  TotalWeightPipePipe } from '../../shared/pipes/total-weight-pipe.pipe';

@NgModule({
  declarations: [RequestCollectComponent,TotalWeightPipePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature("collectRequests", collectReducer),
    EffectsModule.forFeature([CollectEffects]),
  ],
  exports: [RequestCollectComponent],
})
export class CollectModule {}