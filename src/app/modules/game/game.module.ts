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
import { MentalMathematicEffect } from './store/mentalMathematic/effect';
import { CardComponent } from './memory-game-card/components/card/card.component';
import { MemoryColorGamePageComponent } from './pages/memory-color-game-page/memory-color-game-page.component';
import { CommonComponentModule } from "../common-component/common-component.module";

import { MessageModule } from 'primeng/message';
import { CardToFindInGameComponent } from './memory-game-card/components/card-to-find-in-game/card-to-find-in-game.component';
import { GameTextPresentationComponent } from './game-text/components/game-text-presentation/game-text-presentation.component';
import { ButtonModule } from 'primeng/button';
import { GameEndTextComponent } from './game-text/components/game-end-text/game-end-text.component';
import { CountDownComponent } from './memory-game-card/components/count-down/count-down.component';
import { WordActionComponent } from './game-text/components/word-action/word-action.component';
import { ErrorLevelPipe } from './memory-game-card/pipe/error-level.pipe';
import { MentalMathematicPageComponent } from './pages/mental-mathematic-page/mental-mathematic-page.component';
import { MathSelectionPageComponent } from './pages/math-selection-page/math-selection-page.component';
import { CardMentalComponent } from './mental-mathematic/components/card/app-mental.component';
import { OperationComponent } from './mental-mathematic/components/operation/operation.component';
import { ProposalResponseComponent } from './mental-mathematic/components/proposal-response/proposal-response.component';
import { TimeRemainingComponent } from './mental-mathematic/components/time-remaining/time-remaining.component';

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
    WordActionComponent,
    ErrorLevelPipe,
    MentalMathematicPageComponent,
    MathSelectionPageComponent,
    CardMentalComponent,
    OperationComponent,
    ProposalResponseComponent,
    TimeRemainingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(gameRouting),
    StoreModule.forFeature('gameState', gameReducers),
    EffectsModule.forFeature([
        MemoryCardEffect,
        MemoryColorEffect,
        MentalMathematicEffect
    ]),
    CommonComponentModule,
    MessageModule,
    ButtonModule
]
})
export class GameModule { }
