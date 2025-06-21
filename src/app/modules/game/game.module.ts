import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameSelectionPageComponent } from './pages/game-selection-page/game-selection-page.component';
import { MemoryCardGamePageComponent } from './pages/memory-card-game-page/memory-card-game-page.component';
import { RouterModule } from '@angular/router';
import { gameRouting } from './routing/game.routing';
import { StoreModule } from '@ngrx/store';
import { gameReducers } from './store/state'
import { EffectsModule } from '@ngrx/effects';
import { MemoryCardEffect } from './store/memoryCardGame/effect';
import { MemoryColorEffect } from './store/memoryColorGame/effect';


@NgModule({
  declarations: [
    GameSelectionPageComponent,
    MemoryCardGamePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(gameRouting),
    StoreModule.forFeature('gameState', gameReducers),
    EffectsModule.forFeature([
      MemoryCardEffect,
      MemoryColorEffect
    ])
  ]
})
export class GameModule { }
