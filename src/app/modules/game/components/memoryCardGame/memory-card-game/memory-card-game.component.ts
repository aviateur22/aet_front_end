import { Component, OnInit } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Card, CardImage } from '../../../models/memoryCardGame/card.model';
import { CardGame } from '../../../models/memoryCardGame/memory-card-game.model';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import * as cardGameSelector from '../../../store/memoryCardGame/selector';
import { GameTextInformation } from '../../../models/commonModel/game-text-information.model';
import { CardToFind } from '../../../models/memoryCardGame/card-to-find.model';

@Component({
  selector: 'app-memory-card-game',
  templateUrl: './memory-card-game.component.html',
  styleUrl: './memory-card-game.component.css'
})
export class MemoryCardGameComponent implements OnInit {

    isGameLoading$: Observable<boolean> = of(false);
    isGameLoadingSuccess$: Observable<boolean | null> = of(true);
    memoryCardGameData$: Observable<CardGame | null> = of(null);
    gameTextInformation$: Observable<GameTextInformation | null> = of(null);
    presentationText$: Observable<string | null> = of(null);
    isPresentationTextVisible$: Observable<boolean> = of(false);
    cards$: Observable<Card[]> = of([]);
    cardToFindInGame$: Observable<CardImage | null> = of(null);
    isCardToFindInGameVisible$: Observable<boolean> = of(false);
    constructor(private _store: Store<IAppState>){}

    ngOnInit(): void {
      this.selector();
    }

    /**
     * Ngrx selecteur
     */
    selector(): void {
      console.log("selector");

      this.isGameLoading$ = this._store.pipe(select(cardGameSelector.isGameLoadingSelector), tap(res => console.log(res)));
      this.isGameLoadingSuccess$ = this._store.pipe(select(cardGameSelector.isLoadingSuccessSelector));
      this.presentationText$ = this._store.pipe(select(cardGameSelector.presentationTextSelector))
      //this.memoryCardGameData$ = this._store.pipe(select(cardGameSelector.memoryCardGameSelector)).pipe(map(res=>mapToMemoryCardGame(res)));
      this.cards$ = this._store.pipe(select(cardGameSelector.cardsSelector), tap(res=> console.log(res)));
      this.memoryCardGameData$ = this._store.pipe(
        select(cardGameSelector.cardGameSelector),
        tap(res => console.log('Selector output:', res)),
      );
      this.gameTextInformation$ = this._store.pipe(select(cardGameSelector.gameTextInformationSelector), tap(res=> console.log(res)));
      this.cardToFindInGame$ = this._store.pipe(select(cardGameSelector.cardToFindInGameSelector));
      this.isCardToFindInGameVisible$ = this._store.pipe(select(cardGameSelector.isCardToFindInGameVisible));
      this.isPresentationTextVisible$ = this._store.pipe(select(cardGameSelector.isPresentationTextVisibleSelector));

  }

}
