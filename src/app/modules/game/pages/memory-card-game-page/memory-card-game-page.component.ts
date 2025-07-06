import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import * as cardGameSelector from '../../store/memoryCardGame/selector';
import { Observable } from 'rxjs';
import { CardToFind } from '../../models/memoryCardGame/card-to-find.model';
import { Card } from '../../models/memoryCardGame/card.model';
import { CardGame } from '../../models/memoryCardGame/memory-card-game.model';
import { MemoryCardGameRules } from '../../core/memory-card-game-rule';


@Component({
  selector: 'app-memory-card-game-page',
  templateUrl: './memory-card-game-page.component.html',
  styleUrl: './memory-card-game-page.component.css'
})
export class MemoryCardGamePageComponent implements OnInit {
    isGameLoading$: Observable<boolean> =this._store.pipe(select(cardGameSelector.isGameLoadingSelector));
    isGameLoadingSuccess$: Observable<boolean> = this._store.pipe(select(cardGameSelector.isLoadingSuccessSelector));
    cardGame$: Observable<CardGame | null> = this._store.pipe(select(cardGameSelector.cardGameSelector));
    cards$: Observable<Card[]> =  this._store.pipe(select(cardGameSelector.cardsSelector));
    cardToFindInGame$: Observable<CardToFind | null> = this._store.pipe(select(cardGameSelector.cardToFindInGameSelector));
    isGameReadyToPlay$: Observable<boolean> = this._store.pipe(select(cardGameSelector.isGameReadyToPlaySelector));
    isGameWin$: Observable<boolean> = this._store.pipe(select(cardGameSelector.isGameWinSelector));

  constructor(private _store: Store<IAppState>, private _gameRules: MemoryCardGameRules){}

  ngOnInit(): void {
    this._gameRules.initializeGame();
  }



}
