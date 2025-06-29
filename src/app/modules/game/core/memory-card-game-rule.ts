import { Store } from "@ngrx/store";
import { IAppState } from "../../../store/state";
import { CardGame } from "../models/memoryCardGame/memory-card-game.model";
import { Card } from "../models/memoryCardGame/card.model";
import * as actions from '../../../modules/game/store/memoryCardGame/action';
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MemoryCardGameRules {

  constructor(private _store: Store<IAppState>) {}

  intitializeGame() {
    this._store.dispatch(actions.displayBackOfAllGameCardsAction());
  }

  /**
   *
   * @param timeToShowCard
   */
  displayCountDownBeforeCardReturn(timeToShowCard: number) {
    const displayCountDownInterval = setInterval(() =>
      this._store.dispatch(actions.countDownBeforeCardReturnAction({ timeToRemove: 1 })),
    1000);

    setTimeout(() => {
      clearInterval(displayCountDownInterval)
    }, timeToShowCard)
  }

  cardClick(cardId: number) {
    this._store.dispatch(actions.showFrontOfCardClickedAction({ cardId: cardId }));

    setTimeout(() => this.returnBackCard(cardId), 5000)

  }

  returnBackCard(cardId: number) {
    this._store.dispatch(actions.turnCardToBackInitialisationAction({ cardId: cardId }))
  }

}
