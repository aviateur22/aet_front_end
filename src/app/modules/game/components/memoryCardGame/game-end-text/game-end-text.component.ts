import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import { Observable, take } from 'rxjs';
import * as selectors from '../../../store/memoryCardGame/selector';
import * as cardGameActions from '../../../store/memoryCardGame/action';

@Component({
  selector: 'app-game-end-text',
  templateUrl: './game-end-text.component.html',
  styleUrl: './game-end-text.component.css'
})
export class GameEndTextComponent implements OnInit {

  isGameFinish$: Observable<boolean> = this._store.pipe(select(selectors.isGameFinishSelector));
  isGameWin$: Observable<boolean> = this._store.pipe(select(selectors.isGameWinSelector));

  endTextVictory: string = '';
  endTextLost: string = '';

  constructor(private _store: Store<IAppState>){}

  ngOnInit(): void {
    this._store.pipe(select(selectors.endTextVictorySelector)).pipe(take(2)).subscribe(res => this.endTextVictory = res);
    this._store.pipe(select(selectors.endTextLostSelector)).pipe(take(2)).subscribe(res => this.endTextLost = res);
  }

  restartGame() {
    this._store.dispatch(cardGameActions.getMemoryCardGameAction({playerId: '1'}));
  }
}
