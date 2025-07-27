import { select, Store } from "@ngrx/store";
import { IAppState } from "../../../store/state";
import { Card } from "../memory-game-card/models/card.model";
import * as actions from '../store/memoryCardGame/action';
import * as gameTextActions from '../store/gameText/action';
import { Injectable } from "@angular/core";
import { filter, Subject, takeUntil } from "rxjs";
import * as cardGameSelector from '../store/memoryCardGame/selector';
import { GameTextInformationService } from "../game-text/services/game-text-information.service";
import { IGameEndParameterByLevelDto } from "../game-text/models/game-text-information.dto";

@Injectable({
  providedIn: 'root'
})
export class MemoryCardGameRules {

  private _pointToWinGame: number = 0;
  private _actualPoint: number = 0;
  private _actualBadResponse: number = 0;
  private _destroy$ = new Subject<void>();
  private _losingWords: string[] = [];
  private _congratulationWords: string[] = [];
  private _gameEndParameterByLevels: IGameEndParameterByLevelDto[] = [];

  cardToFindQuantity$ = this._store.pipe(select(cardGameSelector.cardToFindQuantitySelector),
  filter((val): val is number => val !== null),
    takeUntil(this._destroy$)
  ).subscribe(value => {
    this._pointToWinGame = value;
  });

  constructor(private _store: Store<IAppState>, private _gameTextInformationService: GameTextInformationService) {
    this._gameTextInformationService.getGameTextInformation()
    .pipe(takeUntil(this._destroy$))
    .subscribe(gametext => {
      if(!gametext)
        return;
      this._losingWords = gametext.loosingWords;
      this._congratulationWords = gametext.congratulationWords;
      this._gameEndParameterByLevels = gametext.gameEndParameterByLevels;
    })
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  beginGame(timeToObserveBeforeStart: number) {
    // Masque le text de présentation
    this.hidePresentationText();

    // Affichage du chrono avant début jeu
    this.displayCountDownBeforeCardReturn(timeToObserveBeforeStart);
  }

  initializeGame() : void {
    this._actualPoint = 0;
    this._actualBadResponse = 0;
    this._store.dispatch(gameTextActions.resetGameText());
    this._store.dispatch(gameTextActions.resetGameText());
    this._store.dispatch(actions.resetGameAction());
    this._store.dispatch(actions.generateNewGameAction({playerId: '1'}));
  }

  showCardToFindInGame() {
    this._store.dispatch(actions.showCardToFindAction());
  }

  hideCardToFindInGame() {
      this._store.dispatch(actions.hideCardToFindAction());
  }

  hidePresentationText() {
    this._store.dispatch(gameTextActions.hidePresentationTextAction());
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

    // Selection d'un message a afficher
    setTimeout(() => this.selectRandomWord(card.isCardToFind), 500);

    if(!card.isCardToFind) {
      // Ajout de mauvais point
      this.addPointToLose();

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
    this._actualBadResponse ++;
    this._store.dispatch(actions.updateBadResponseCumulatedAction({ badResponseQuantity: this._actualBadResponse }));
  }

  selectRandomWord(isCardValid: boolean): void {
    const looseIndex = Math.floor(Math.random() * this._losingWords.length);
    const congratIndex = Math.floor(Math.random() * this._losingWords.length);

    const word = isCardValid ? this._congratulationWords[congratIndex] : this._losingWords[looseIndex];

    this.updateWord(word);
  }

  updateWord(word: string) {
    this._store.dispatch(gameTextActions.updateWordToDisplayAction({ wordToDisplay: word }));
    this._store.dispatch(gameTextActions.updateWordVisibilityAction({ isVisible: true }));

    // Masque le mot
    setTimeout(()=> this.hideWord(), 700);
  }

  hideWord() {
    this._store.dispatch(gameTextActions.updateWordToDisplayAction({ wordToDisplay: "" }));
    this._store.dispatch(gameTextActions.updateWordVisibilityAction({ isVisible: false }));
  }

  isGameWin(): void {
    if(this._actualPoint === this._pointToWinGame) {
      setTimeout(()=>{
        this.selectEndGameTitleAndText()
        this._store.dispatch(actions.setIsGameWinAction({isGameWin : true}));
        this._store.dispatch(actions.setIsGameFinishAction({isGameFinish : true}));
      }, 1000);
    }
  }

  isGameLoose(): boolean {
    return false;
  }

  selectEndGameTitleAndText(): void {
    console.log(this._actualBadResponse);
    console.log(this._gameEndParameterByLevels);
    let selectEndParameter: IGameEndParameterByLevelDto | undefined = this._gameEndParameterByLevels.find(endParam => {
      console.log(endParam.minError <= this._actualBadResponse && endParam.maxError >= this._actualBadResponse)
      return endParam.minError <= this._actualBadResponse && endParam.maxError >= this._actualBadResponse
    });
    console.log(selectEndParameter);
    if(selectEndParameter)
      this._store.dispatch(gameTextActions.setEndTextAction({
        endTitle: selectEndParameter.endGameText.endTitle,
        endText: selectEndParameter.endGameText.endText ,
        endErrorLevel: selectEndParameter.endResultLevel }))
  }
}
