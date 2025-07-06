import { select, Store } from "@ngrx/store";
import { IAppState } from "../../../store/state";
import { Card } from "../models/memoryCardGame/card.model";
import * as actions from '../../../modules/game/store/memoryCardGame/action';
import { Injectable } from "@angular/core";
import { filter, Observable, of, take } from "rxjs";
import * as cardGameSelector from '../../game/store/memoryCardGame/selector';

@Injectable({
  providedIn: 'root'
})
export class MemoryCardGameRules {


  private _pointToWinGame: number = 0;
  private _actualPoint: number = 0;

  cardToFindQuantity$ = this._store.pipe(select(cardGameSelector.cardToFindQuantitySelector));

  constructor(private _store: Store<IAppState>) {
    this.getCardToFindQuantity();
  }


  private getCardToFindQuantity(): void {
    this.cardToFindQuantity$
    .pipe(
      filter((val): val is number => val !== null),
      take(2)
    )
    .subscribe(value => {
      this._pointToWinGame = value;
    });
  }

  beginGame(timeToObserveBeforeStart: number) {
    // Masque le text de présentation
    this.hidePresentationText();

    // Affichage du chrono avant début jeu
    this.displayCountDownBeforeCardReturn(timeToObserveBeforeStart);
  }

  showCardToFindInGame() {
    this._store.dispatch(actions.showCardToFindAction());
  }

  hideCardToFindInGame() {
      this._store.dispatch(actions.hideCardToFindAction());
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
    this._store.dispatch(actions.countDownVisibilityAction({ isVisible: true }));

    const displayCountDownInterval = setInterval(() => {

      this._store.dispatch(actions.countDownBeforeCardReturnAction({ timeToRemove: 1 }));

    },
    1000);

    setTimeout(() => {
      clearInterval(displayCountDownInterval);

      // Retournes les cartes pour commencer a jouer
      this.returnAllCardsToPlay();

        // Affichage de la carte a trouver
        this.showCardToFindInGame();

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
      setTimeout(()=>{
        this._store.dispatch(actions.setIsGameWinAction({isGameWin : true}));
        this._store.dispatch(actions.setIsGameFinishAction({isGameFinish : true}));
      }, 1000);
    }
  }

  isGameLoose(): boolean {
    return false;
  }

  initializeGame() : void {
    this._actualPoint = 0;
    this._store.dispatch(actions.resetGameAction());
    this._store.dispatch(actions.getMemoryCardGameAction({playerId: '1'}));
  }

}
