import { NgModule } from '@angular/core';
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
    CommonComponentModule
],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: lara
      }
  })],
  bootstrap: [AppComponent]
})
export class AppModule { }


