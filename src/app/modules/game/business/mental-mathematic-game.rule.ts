import { select, Store } from "@ngrx/store";
import { IAppState } from "../../../store/state";
import { Observable, of, Subject, takeUntil } from "rxjs";
import { GameTextInformationService } from "../game-text/services/game-text-information.service";
import { IGameEndParameterByLevelDto } from "../game-text/models/game-text-information.dto";
import { Injectable } from "@angular/core";
import * as mentalMathematicActions from "../store/mentalMathematic/action"
import * as mentalMathematicSelectors from "../store/mentalMathematic/selector"
import { ActiveOperation, GameLevel } from "../mental-mathematic/models/mental-math.model";
import * as gameTextActions from '../store/gameText/action';
import { IOperationState } from "../store/mentalMathematic/state";

@Injectable({
  providedIn: 'root'
})
export class MentalMathematicGameRule {

  private _destroy$ = new Subject<void>();
  private _actualBadResponse: number = 0;
  constructor(
    private _store: Store<IAppState>,
 //   private _gameTextInformationService: GameTextInformationService
  ) {
   this.onInit()
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onInit()  {

    /**
     * Selecteur sur les informations de text
     */
    // this._gameTextInformationService.getGameTextInformation()
    //   .pipe(takeUntil(this._destroy$))
    //   .subscribe(gametext=>{
    //     if(!gametext)
    //       return;

    //     this._gameEndParameterByLevels = gametext.gameEndParameterByLevels;
    // });

    /**
     * Selecteur identifiant de calcul qui est encours
     */
    //  this._store.pipe(select(mentalMathematicSelectors.activeOperationIndexSelector))
    // .pipe(takeUntil(this._destroy$))
    // .subscribe(activeOperationIndex => {
    //   if(activeOperationIndex === null || activeOperationIndex === undefined)
    //     return;

    //   return this._activeOperationIndex = activeOperationIndex;
    // });
  }

  /**
   * Chargement du jeu
   * @param gameLevel
   */
  loadGame(gameLevel: GameLevel): void {
    this._actualBadResponse = 0;
    //this._activeOperationIndex = 0;
    this._store.dispatch(mentalMathematicActions.resetMentalMathematicGameAction());
    this._store.dispatch(gameTextActions.resetGameText());
    this._store.dispatch(mentalMathematicActions.loadNewMentalMathematicGameAction({ gameLevel: gameLevel }));
  }

  /**
   * Commence la partie
   */
  beginGame(): void {
    //this._store.dispatch(mentalMathematicActions.nextOperationIndexAction({ activeOperationIndex: this._activeOperationIndex }));
    this._store.dispatch(mentalMathematicActions.isActiveOperationVisibleAction({ isVisible: true}))
    this._store.dispatch(gameTextActions.hidePresentationTextAction());
    this._store.dispatch(mentalMathematicActions.prepareOperationTimer());
  }

  /**
   * Décompte du temps
   */
  // startTimeDecount(): void {

  // }


  /**
   * Passe au calcul suivant en clicquant sur le button suivant
   */
  manualyEndRemainingCalculationTime() {
    this._store.dispatch(mentalMathematicActions.manualyGoToNextOperationAction());
  }

  /**
   * Passe au calcul suivant si le temps de calcul est écoulé
   */
  // remainigCalcultionTimeFinish(): void {

  // }

  /**
   * Initialisation de la prochaine question
   */
  // nextOperation(): void {
  //   this._store.dispatch(mentalMathematicActions.nextOperationAction());
  //   this._store.dispatch(mentalMathematicActions.isActiveOperationVisibleAction({ isVisible: true}));

  //   this.startTimeDecount();
  // }

  /**
   * Quand la liste au choix multiple est proposée
   * Selection de la réponse du joeur
   */
  selectPropsalResponse(proposalResponseId: number): void {
    this._store.dispatch(mentalMathematicActions.selectProposalResponseAction({
      proposalResponseId
    }));
  }


}
