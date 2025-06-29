import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from 'primeng/api';

import { commonReducers } from './store/reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonEffect } from './store/effect';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { ButtonGameSelectionComponent } from './components/button/button-game-selection/button-game-selection.component';

import { ButtonModule } from 'primeng/button';
import { WindowLoaderComponent } from './components/window-loader/window-loader.component';

@NgModule({
  declarations: [
    MainContainerComponent,
    ButtonGameSelectionComponent,
    WindowLoaderComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('commonState', commonReducers),
    EffectsModule.forFeature([
      CommonEffect
    ]),
    ButtonModule
  ],
  providers: [
    MessageService
  ],
  exports: [
    MainContainerComponent,
    ButtonGameSelectionComponent
  ]
})
export class CommonComponentModule { }
