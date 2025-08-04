import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import * as selectors from '../../../store/memoryCardGame/selector';
import * as mentalMathSelectors from '../../../store/mentalMathematic/selector';
import * as gameTextSelectors from '../../../store/gameText/selector';
import * as gameSelectedSelector from '../../../store/gameSelected/selector';
import { MemoryCardGameRules } from '../../../business/memory-card-game-rule';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import frontPage from '../../../../../../misc/front-page';
import { EndResultLevel } from '../../models/endResultLevel.model';
import { GameSelection } from '../../../game-selected/models/game-selected.model';
import { MentalMathematicGameRule } from '../../../business/mental-mathematic-game.rule';
import { GameLevel } from '../../../mental-mathematic/models/mental-math.model';

@Component({
  selector: 'app-game-end-text',
  templateUrl: './game-end-text.component.html',
  styleUrl: './game-end-text.component.css',
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
export class GameEndTextComponent implements OnInit, OnDestroy {

  private _destroyed$ = new Subject<void>();
  private _gameSelected: GameSelection | null = null;

  isEndTextToShow$: Observable<boolean> = this._store.pipe(select(gameTextSelectors.isEndGameInstructionVisibleSelector));
  endGameText: string = '';
  endGameTitle: string = '';
  badResponseQuantity: number = 0;
  actualErrorLevel: EndResultLevel | null = null;

  constructor(
    private _store: Store<IAppState>,
    private _gameRules: MemoryCardGameRules,
    private _mentalManthRules: MentalMathematicGameRule,
    private _router: Router){}

  ngOnDestroy(): void {
   this._destroyed$.next();
   this._destroyed$.complete();
  }

  ngOnInit(): void {
    this._store.pipe(select(gameTextSelectors.endTextSelector)).pipe(takeUntil(this._destroyed$)).subscribe(res => this.endGameText = res);
    this._store.pipe(select(gameTextSelectors.endTextTitleSelector)).pipe(takeUntil(this._destroyed$)).subscribe(res => this.endGameTitle = res);
    this._store.pipe(select(selectors.badResponseCumulatedSelector)).pipe(takeUntil(this._destroyed$)).subscribe(res => this.badResponseQuantity = res);
    this._store.pipe(select(mentalMathSelectors.badResponseSelector)).pipe(takeUntil(this._destroyed$)).subscribe(res => this.badResponseQuantity = res);
    this._store.pipe(select(gameTextSelectors.errorLevelSelector)).pipe(takeUntil(this._destroyed$)).subscribe(res => this.actualErrorLevel = res);
    this._store.pipe(select(gameSelectedSelector.gameSelectedSelector))
        .pipe(takeUntil(this._destroyed$))
        .subscribe(res => this._gameSelected = res);
  }


  restartGame() {
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

  startMemoryCardGame() {
    this._gameRules.initializeGame();
  }

  startMentalMathematic() {
    this._mentalManthRules.loadGame(GameLevel.EASY);
  }

  startColorGame() {

  }

  backToMenu() {
    this._router.navigate([frontPage.gameSelection.url]);
  }
}
