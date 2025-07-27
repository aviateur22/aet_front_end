import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { IAppState } from '../../../../../store/state';
import * as cardGameSelector from '../../../store/memoryCardGame/selector';
import * as gameTextSelector from '../../../store/gameText/selector';
import * as gameSelectedSelector from '../../../store/gameSelected/selector';
import { MemoryCardGameRules } from '../../../business/memory-card-game-rule';
import { trigger, transition, style, animate } from '@angular/animations';
import { GameSelection } from '../../../game-selected/models/game-selected.model';
import { MentalMathematicGameRule } from '../../../business/mental-mathematic-game.rule';
import { GameLevel } from '../../../mental-mathematic/models/mental-math.model';

@Component({
  selector: 'app-game-text-presentation',
  templateUrl: './game-text-presentation.component.html',
  styleUrl: './game-text-presentation.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class GameTextPresentationComponent implements OnInit, OnDestroy {
  private _gameSelected: GameSelection | null = null;
  private _destroyed$ = new Subject<void>()

  isPresentationVisible$ =  this._store.pipe(select(gameTextSelector.isInstructionVisibleSelector));
  gameTitle$ = this._store.pipe(select(gameTextSelector.gameTitleSelector));
  presentationText$ = this._store.pipe(select(gameTextSelector.presentationTextSelector));

  constructor(
    private _store: Store<IAppState>,
    private _memoryCardGameRules: MemoryCardGameRules,
    private _mentalMathematicRules: MentalMathematicGameRule){}

  ngOnInit(): void {
    this._store.pipe(select(gameSelectedSelector.gameSelectedSelector))
    .pipe(takeUntil(this._destroyed$))
    .subscribe(res => this._gameSelected = res);

  }

  ngOnDestroy(): void {
   this._destroyed$.next;
   this._destroyed$.complete;
  }

  startGame(): void {
    switch(this._gameSelected) {
      case GameSelection.MEMORY_CARD_GAME:
        this.startMemoryCardGame();
        break;

      case GameSelection.MENTAL_MATHEMATIC_GAME:
        this.startMentalMathematic();
        break;

      case GameSelection.MEMORY_COLOR_GAME:
        this.startColorGame();
        break;

      default: throw Error("Oups il n'y a pas de jeu validé")
    }
  }

  startMemoryCardGame(): void {
    let timeToObserve: number = 0;
    let isLoadingSuccess: boolean = false;

     this._store.pipe(select(cardGameSelector.isLoadingSuccessSelector))
    .pipe(takeUntil(this._destroyed$))
    .subscribe(res=> isLoadingSuccess = res);

    this._store.pipe(select(cardGameSelector.timeToObserveBeforeStartSelector))
    .pipe(takeUntil(this._destroyed$))
    .subscribe(res=> timeToObserve = res);

    if( timeToObserve > 0 && isLoadingSuccess)
    this._memoryCardGameRules.beginGame(timeToObserve);
  }

  startColorGame(): void {
  }

  startMentalMathematic(): void {
    this._mentalMathematicRules.beginGame();
  }
}
