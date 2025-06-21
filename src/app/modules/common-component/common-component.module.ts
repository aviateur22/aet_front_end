import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { commonReducers } from './store/reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonEffect } from './store/effect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('commonState', commonReducers),
    EffectsModule.forFeature([
      CommonEffect
    ]),
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class CommonComponentModule { }
