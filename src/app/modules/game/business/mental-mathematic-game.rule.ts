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
  private _gameEndParameterByLevels: IGameEndParameterByLevelDto[] = [];
  private _actualBadResponse: number = 0;
  private _operationPosition = 0;
  private _activeOperationId = 0;
  private _reamainingTimeToCalculate = 0;
  private _operationList : IOperationState[] = [];
  private _initialTimeToCalculate: number = 0;

  constructor(
    private _store: Store<IAppState>,
    private _gameTextInformationService: GameTextInformationService
  ) {
   this.onInit()
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onInit()  {
    this._gameTextInformationService.getGameTextInformation()
      .pipe(takeUntil(this._destroy$))
      .subscribe(gametext=>{
        if(!gametext)
          return;

        this._gameEndParameterByLevels = gametext.gameEndParameterByLevels;
    });

    this._store.pipe(select(mentalMathematicSelectors.operationListSelector))
    .pipe(takeUntil(this._destroy$))
    .subscribe(res => this._operationList = res);

     this._store.pipe(select(mentalMathematicSelectors.activeOperationIdSelector))
    .pipe(takeUntil(this._destroy$))
    .subscribe(res => {
      if(!res)
        return;

      return this._activeOperationId = res
    });

    this._store.pipe(select(mentalMathematicSelectors.activeTimeToCalculateSelector))
    .pipe(takeUntil(this._destroy$))
    .subscribe(res => {
      if(!res)
        return;

      return this._reamainingTimeToCalculate = res
    });
  }

  /**
   * Chargement du jeu
   * @param gameLevel
   */
  loadGame(gameLevel: GameLevel): void {
    this._actualBadResponse = 0;
    this._operationPosition = 0;
    this._store.dispatch(gameTextActions.resetGameText());
    this._store.dispatch(mentalMathematicActions.resetMentalMathematicGameAction());
    this._store.dispatch(mentalMathematicActions.loadNewMentalMathematicGameAction({ gameLevel: gameLevel }));
  }

  /**
   * Commence la partie
   */
  beginGame(): void {
    const operationId = this._operationList[this._operationPosition].id;
    this._store.dispatch(mentalMathematicActions.nextOperationIdAction({ operationId }));
    this._store.dispatch(mentalMathematicActions.isActiveOperationVisibleAction({ isVisible: true}))
    this._store.dispatch(gameTextActions.hidePresentationTextAction());
    this.startTimeDecount();
  }

  /**
   * Décompte du temps
   */
  startTimeDecount(): void {
    this._initialTimeToCalculate = this._reamainingTimeToCalculate;

    setTimeout(() => {
      const decountTime = setInterval(()=>
        this._store.dispatch(mentalMathematicActions.decountRemainingTimeAction({ remainingTime:  this._reamainingTimeToCalculate  - 1, operationId: this._activeOperationId })) ,
        1000);

        setTimeout(() => {
          clearInterval(decountTime);
          this.mentalCalculatedTimeTerminated();
        },  this._initialTimeToCalculate * 1000);
    }, 2000);
  }


  mentalCalculatedTimeTerminated(): void {
    this._store.dispatch(mentalMathematicActions.isActiveOperationVisibleAction({ isVisible: false}));

    if(this._operationPosition >= this._operationList.length)
      return;

    this._operationPosition++
    setTimeout(() => this.nextOperation(), 1000);
  }

  nextOperation(): void {
    const operationId = this._operationList[this._operationPosition].id;
    this._store.dispatch(mentalMathematicActions.nextOperationIdAction({ operationId }));
    this._store.dispatch(mentalMathematicActions.isActiveOperationVisibleAction({ isVisible: true}));

    this.startTimeDecount();
  }

  selectPropsalResponse(proposalResponseId: number) {
    this._store.dispatch(mentalMathematicActions.selectProposalResponse({
      proposalResponseId,
      operationId: this._activeOperationId
    }));
  }


}
