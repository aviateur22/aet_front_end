import { select, Store } from "@ngrx/store";
import { IAppState } from "../../../store/state";
import { CardGame } from "../models/memoryCardGame/memory-card-game.model";
import { Card } from "../models/memoryCardGame/card.model";
import * as actions from '../../../modules/game/store/memoryCardGame/action';
import { Inject, Injectable } from "@angular/core";
import * as selectors from '../../../modules/game/store/memoryCardGame/selector'
import { filter, Observable, of, take } from "rxjs";
import * as cardGameSelector from '../../game/store/memoryCardGame/selector';

@Injectable({
  providedIn: 'root'
})
export class MemoryCardGameRules {


  private _pointToWinGame: number = 0;
  private _actualPoint: number = 0;
  private _isGameWin = false;

  cardToFindQuantity$: Observable<number | null> = of(null);

  constructor(private _store: Store<IAppState>) {
    this.cardToFindQuantity$ = this._store.pipe(select(cardGameSelector.cardToFindQuantitySelector));

    this.cardToFindQuantity$
    .pipe(
      filter((val): val is number => val !== null),
      take(2)
    )
    .subscribe(value => {
      this._pointToWinGame = value;
    });
  }


  intitializeGame(timeToObserveBeforeStart: number) {
    // Masque le text de présentation
    this.hidePresentationText();

    // Affichage du chrono avant début jeu
    this.displayCountDownBeforeCardReturn(timeToObserveBeforeStart);

    // Affichage de la carte a trouver
    this.showCardToFindInGame();
  }

  showCardToFindInGame() {
    this._store.dispatch(actions.showCardToFindAction());
  }

  hideCardToFindInGame(timeBeforeHideCard: number) {
    const timeBeforeHideCardInMs = timeBeforeHideCard * 1000;

    setTimeout(() => {
      this._store.dispatch(actions.hideCardToFindAction());
    }, timeBeforeHideCardInMs);

  }

  hidePresentationText() {
    this._store.dispatch(actions.hidePresentationTextAction());
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

      // Masque la carte a trouver
      this.hideCardToFindInGame(timeToObserveBeforeStart);
    }, timeToObserveInMs);
  }

  returnAllCardsToPlay() {
    this._store.dispatch(actions.displayBackOfAllGameCardsAction());
  }

  cardClick(card: Card) {

    if(!card.isCardReturned)
      return;

    const cardId: number = card.id;

    this._store.dispatch(actions.showFrontOfCardClickedAction({ cardId: cardId }));

    if(!card.isCardToFind) {
      setTimeout(() => this.returnBackCard(cardId), 2000);
      return;
    }

    this.addPointToWin();
    this.isGameWin();


  }

  returnBackCard(cardId: number) {
    this._store.dispatch(actions.turnCardToBackInitialisationAction({ cardId: cardId }))
  }

  addPointToWin(): void {
    this._actualPoint++;
  }

  addPointToLose(): void {
  }

  isGameWin(): void {
    if(this._actualPoint === this._pointToWinGame) {
      this._store.dispatch(actions.setIsGameWinAction({isGameWin : true}));
      this._store.dispatch(actions.setIsGameFinishAction({isGameFinish : true}));


    }
  }

  isGameLoose(): boolean {
    return false;
  }


}
