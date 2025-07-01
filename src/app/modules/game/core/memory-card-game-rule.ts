import { select, Store } from "@ngrx/store";
import { IAppState } from "../../../store/state";
import { CardGame } from "../models/memoryCardGame/memory-card-game.model";
import { Card } from "../models/memoryCardGame/card.model";
import * as actions from '../../../modules/game/store/memoryCardGame/action';
import { Inject, Injectable } from "@angular/core";
import * as selectors from '../../../modules/game/store/memoryCardGame/selector'
import { Observable, of, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MemoryCardGameRules {


  constructor(private _store: Store<IAppState>) {}

  intitializeGame(timeToObserveBeforeStart: number) {
    // Affichage du chrono avant début jeu
    this.displayCountDownBeforeCardReturn(timeToObserveBeforeStart);
  }

  /**
   *
   * @param timeToShowCard
   */
  displayCountDownBeforeCardReturn(timeToObserveBeforeStart: number) {

    const timeToObserveInMs = timeToObserveBeforeStart * 1000;

    const displayCountDownInterval = setInterval(() =>
      this._store.dispatch(actions.countDownBeforeCardReturnAction({ timeToRemove: 1 })),
    1000);

    setTimeout(() => {
      clearInterval(displayCountDownInterval);

      // Retournes les cartes pour commencer a jouer
      this.returnAllCardsToPlay();
    }, timeToObserveInMs)
  }

  returnAllCardsToPlay() {
    this._store.dispatch(actions.displayBackOfAllGameCardsAction());
  }

  cardClick(card: Card) {

    const cardId: number = card.id;

    this._store.dispatch(actions.showFrontOfCardClickedAction({ cardId: cardId }));

    if(!card.isCardToFind)
      setTimeout(() => this.returnBackCard(cardId), 3000)

  }

  returnBackCard(cardId: number) {
    this._store.dispatch(actions.turnCardToBackInitialisationAction({ cardId: cardId }))
  }

}
