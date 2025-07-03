import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, take, tap } from 'rxjs';
import { Card, CardImage } from '../../../models/memoryCardGame/card.model';
import { CardGame } from '../../../models/memoryCardGame/memory-card-game.model';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import * as cardGameSelector from '../../../store/memoryCardGame/selector';
import { CardToFind } from '../../../models/memoryCardGame/card-to-find.model';



@Component({
  selector: 'app-memory-card-game',
  templateUrl: './memory-card-game.component.html',
  styleUrl: './memory-card-game.component.css'
})
export class MemoryCardGameComponent implements OnInit {

    isGameLoading$: Observable<boolean> =this._store.pipe(select(cardGameSelector.isGameLoadingSelector));
    isGameLoadingSuccess$: Observable<boolean> = this._store.pipe(select(cardGameSelector.isLoadingSuccessSelector));
    cardGame$: Observable<CardGame | null> = this._store.pipe(select(cardGameSelector.cardGameSelector));
    cards$: Observable<Card[]> =  this._store.pipe(select(cardGameSelector.cardsSelector));
    cardToFindInGame$: Observable<CardToFind | null> = this._store.pipe(select(cardGameSelector.cardToFindInGameSelector));
    isCardToFindInGameVisible$: Observable<boolean> = this._store.pipe(select(cardGameSelector.isCardToFindVisibleSelector));
    isGameReadyToPlay$: Observable<boolean> = this._store.pipe(select(cardGameSelector.isGameReadyToPlaySelector));
    timeToObservBeforeStart$: Observable<number | null> = this._store.pipe(select(cardGameSelector.timeToObserveBeforeStartSelector));
    isGameWin$: Observable<boolean> = this._store.pipe(select(cardGameSelector.isGameWinSelector));


    constructor(private _store: Store<IAppState>){}

    ngOnInit(): void {}

}
