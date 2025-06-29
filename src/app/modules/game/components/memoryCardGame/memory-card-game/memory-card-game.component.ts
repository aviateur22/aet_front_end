import { Component, OnInit } from '@angular/core';
import { Observable, of, take, tap } from 'rxjs';
import { Card, CardImage } from '../../../models/memoryCardGame/card.model';
import { CardGame } from '../../../models/memoryCardGame/memory-card-game.model';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import * as cardGameSelector from '../../../store/memoryCardGame/selector';
import * as cardGameAction from '../../../store/memoryCardGame/action';
import { GameTextInformation } from '../../../models/commonModel/game-text-information.model';
import { MemoryCardGameRules } from '../../../core/memory-card-game-rule';


@Component({
  selector: 'app-memory-card-game',
  templateUrl: './memory-card-game.component.html',
  styleUrl: './memory-card-game.component.css'
})
export class MemoryCardGameComponent implements OnInit {

    isGameLoading$: Observable<boolean> = of(false);
    isGameLoadingSuccess$: Observable<boolean | null> = of(true);
    cardGame$: Observable<CardGame | null> = of(null);
    gameTextInformation$: Observable<GameTextInformation | null> = of(null);
    presentationText$: Observable<string | null> = of(null);
    isPresentationTextVisible$: Observable<boolean> = of(false);
    cards$: Observable<Card[]> = of([]);
    cardToFindInGame$: Observable<CardImage | null> = of(null);
    isCardToFindInGameVisible$: Observable<boolean> = of(false);
    isGameReadyToPlay$: Observable<boolean> = of(false);

    constructor(private _store: Store<IAppState>, private _memoryCardGameRules: MemoryCardGameRules){}

    ngOnInit(): void {
      this.selector();
      this.starteGame();
    }

    /**
     * Ngrx selecteur
     */
    selector(): void {
      this.isGameReadyToPlay$ = this._store.pipe(select(cardGameSelector.isGameReadyToPlaySelector));
      this.isGameLoading$ = this._store.pipe(select(cardGameSelector.isGameLoadingSelector), tap(res => console.log(res)));
      this.isGameLoadingSuccess$ = this._store.pipe(select(cardGameSelector.isLoadingSuccessSelector));
      this.presentationText$ = this._store.pipe(select(cardGameSelector.presentationTextSelector))
      this.cards$ = this._store.pipe(select(cardGameSelector.cardsSelector), tap(res=> console.log(res)));
      this.cardGame$ = this._store.pipe(select(cardGameSelector.cardGameSelector));
      this.gameTextInformation$ = this._store.pipe(select(cardGameSelector.gameTextInformationSelector), tap(res=> console.log(res)));
      this.cardToFindInGame$ = this._store.pipe(select(cardGameSelector.cardToFindInGameSelector));
      this.isCardToFindInGameVisible$ = this._store.pipe(select(cardGameSelector.isCardToFindInGameVisible));
      this.isPresentationTextVisible$ = this._store.pipe(select(cardGameSelector.isPresentationTextVisibleSelector));
    }

    starteGame(): void {
      this.isGameLoadingSuccess$.pipe(take(2)).subscribe(isloadingSuccess => {
        if(isloadingSuccess)
          setTimeout(() => this._memoryCardGameRules.intitializeGame() ,1000);
    });
    }

}
