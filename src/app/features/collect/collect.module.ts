import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RequestCollectComponent } from './request-collect/request-collect.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { collectReducer } from '../../store/reducers/collect.reducer';
import { CollectEffects } from '../../store/effects/collect.effects';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RequestCollectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature("collectRequests", collectReducer),
    EffectsModule.forFeature([CollectEffects]),
  ],
  exports: [RequestCollectComponent],
})
export class CollectModule {}