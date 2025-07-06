import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import { Observable, take } from 'rxjs';
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
export class GameEndTextComponent implements OnInit {

  isGameFinish$: Observable<boolean> = this._store.pipe(select(selectors.isGameFinishSelector));
  isGameWin$: Observable<boolean> = this._store.pipe(select(selectors.isGameWinSelector));

  endTextVictory: string = '';
  endTextLost: string = '';

  constructor(private _store: Store<IAppState>, private _gameRules: MemoryCardGameRules, private _router: Router){}

  ngOnInit(): void {
    this._store.pipe(select(selectors.endTextVictorySelector)).pipe(take(2)).subscribe(res => this.endTextVictory = res);
    this._store.pipe(select(selectors.endTextLostSelector)).pipe(take(2)).subscribe(res => this.endTextLost = res);
  }

  restartGame() {
    this._gameRules.initializeGame();
  }

  backToMenu() {
    this._router.navigate([frontPage.gameSelection.url]);
  }
}
