import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { reducers } from "./store/state";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import lara from  '@primeng/themes/lara';
import { providePrimeNG } from "primeng/config"
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environment/environment';
import { provideHttpClient } from '@angular/common/http';
import { GameModule } from './modules/game/game.module';
import { CommonModule } from '@angular/common';
import { AuthorizeModule } from './modules/authorize/authorize.module';

import { ToastModule } from 'primeng/toast';
import { CommonComponentModule } from "./modules/common-component/common-component.module";
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    GameModule,
    AuthorizeModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
        maxAge: 1000,
        logOnly: environment.production,
        trace: true,
        serialize: { replacer: (_key, value) => (typeof value === "bigint" ? value.toString() : value) }
    }),
    ToastModule,
    CommonComponentModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: lara,
        options: {
          darkModeSelector: false
        }
      }
  })],
  bootstrap: [AppComponent]
})
export class AppModule { }


