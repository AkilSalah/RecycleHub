import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { SharedModuleModule } from './shared/components/shared-module.module';
import { UserModule } from './features/user/user.module';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { CollectModule } from './features/collect/collect.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TotalWeightPipePipe } from './shared/pipes/total-weight-pipe.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AuthModule,
    SharedModuleModule,
    UserModule,
    CollectModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false, 
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
