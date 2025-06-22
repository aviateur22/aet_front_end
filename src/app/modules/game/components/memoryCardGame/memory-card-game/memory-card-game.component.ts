import { Component, OnInit } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Card } from '../../../models/memoryCardGame/card.model';
import { MemoryCardGame } from '../../../models/memoryCardGame/memory-card-game.model';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import { mapToMemoryCardGame } from '../../../store/memoryCardGame/mapper/store-object-to-model-instance-mapper';
import * as cardGameSelector from '../../../store/memoryCardGame/selector';

@Component({
  selector: 'app-memory-card-game',
  templateUrl: './memory-card-game.component.html',
  styleUrl: './memory-card-game.component.css'
})
export class MemoryCardGameComponent implements OnInit {

    isGameLoading$: Observable<boolean> = of(false);
    isGameLoadingSuccess$: Observable<boolean> = of(true);
    memoryCardGameData$: Observable<MemoryCardGame | null> = of(null);
    cards$: Observable<Card[]> = of([]);

    constructor(private _store: Store<IAppState>){}

    ngOnInit(): void {
      this.selector();
    }

    /**
     * Ngrx selecteur
     */
    selector(): void {
      console.log("selector")
      this.isGameLoading$ = this._store.pipe(select(cardGameSelector.isGameLoadingSelector), tap(res => console.log(res)));
      this.isGameLoadingSuccess$ = this._store.pipe(select(cardGameSelector.isLoadingSuccessSelector));
      //this.memoryCardGameData$ = this._store.pipe(select(cardGameSelector.memoryCardGameSelector)).pipe(map(res=>mapToMemoryCardGame(res)));
      this.cards$ = this._store.pipe(select(cardGameSelector.cardsSelector), tap(res=> console.log(res)));
      this.memoryCardGameData$ = this._store.pipe(
        select(cardGameSelector.memoryCardGameSelector),
        tap(res => console.log('Selector output:', res)),
        map(res => mapToMemoryCardGame(res))
);
  }

}
