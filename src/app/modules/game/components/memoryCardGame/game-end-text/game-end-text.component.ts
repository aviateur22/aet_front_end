import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import * as selectors from '../../../store/memoryCardGame/selector';
import { MemoryCardGameRules } from '../../../core/memory-card-game-rule';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import frontPage from '../../../../../../misc/front-page';

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

  isGameFinish$: Observable<boolean> = this._store.pipe(select(selectors.isGameFinishSelector));
  isGameWin$: Observable<boolean> = this._store.pipe(select(selectors.isGameWinSelector));

  endTextVictory: string = '';
  endTextLost: string = '';
  badResponseQuantity: number = 0;

  constructor(private _store: Store<IAppState>, private _gameRules: MemoryCardGameRules, private _router: Router){}

  ngOnDestroy(): void {
   this._destroyed$.next();
   this._destroyed$.complete();
  }

  ngOnInit(): void {
    this._store.pipe(select(selectors.endTextVictorySelector)).pipe(takeUntil(this._destroyed$)).subscribe(res => this.endTextVictory = res);
    this._store.pipe(select(selectors.endTextLostSelector)).pipe(takeUntil(this._destroyed$)).subscribe(res => this.endTextLost = res);
    this._store.pipe(select(selectors.badResponseCumulatedSelector)).pipe(takeUntil(this._destroyed$)).subscribe(res => this.badResponseQuantity = res);
  }

  restartGame() {
    this._gameRules.initializeGame();
  }

  backToMenu() {
    this._router.navigate([frontPage.gameSelection.url]);
  }
}
