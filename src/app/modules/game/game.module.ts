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
import { CardComponent } from './components/memoryCardGame/card/card.component';
import { MemoryColorGamePageComponent } from './pages/memory-color-game-page/memory-color-game-page.component';
import { CommonComponentModule } from "../common-component/common-component.module";

import { MessageModule } from 'primeng/message';
import { CardToFindInGameComponent } from './components/memoryCardGame/card-to-find-in-game/card-to-find-in-game.component';
import { GameTextPresentationComponent } from './components/memoryCardGame/game-text-presentation/game-text-presentation.component';
import { ButtonModule } from 'primeng/button';
import { GameEndTextComponent } from './components/memoryCardGame/game-end-text/game-end-text.component';
import { CountDownComponent } from './components/memoryCardGame/count-down/count-down.component';

@NgModule({
  declarations: [
    GameSelectionPageComponent,
    MemoryCardGamePageComponent,
    CardComponent,
    MemoryColorGamePageComponent,
    CardToFindInGameComponent,
    GameTextPresentationComponent,
    GameEndTextComponent,
    CountDownComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(gameRouting),
    StoreModule.forFeature('gameState', gameReducers),
    EffectsModule.forFeature([
        MemoryCardEffect,
        MemoryColorEffect
    ]),
    CommonComponentModule,
    MessageModule,
    ButtonModule
]
})
export class GameModule { }
