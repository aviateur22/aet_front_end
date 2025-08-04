import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MentalMathematicApiService } from "../../mental-mathematic/service/mental-mathematic-api.service";
import * as mentalMathAction from "./action";
import * as selectors from "./selector";
import { catchError, concat, delay, EMPTY, filter, iif, interval, map, mergeMap, of, switchMap, take, takeUntil, tap, timer, withLatestFrom } from "rxjs";
import * as commonAction from './../../../common-component/store/action';
import * as gameTextAction from "../gameText/action";
import { select, Store } from "@ngrx/store";
import { IAppState } from "../../../../store/state";
import { GameTextInformationService } from "../../game-text/services/game-text-information.service";

@Injectable()
export class MentalMathematicEffect {
  constructor(
    private _action$: Actions,
    private _mentalGameService: MentalMathematicApiService,
    private _store: Store<IAppState>,
     private _gameTextInformationService: GameTextInformationService
  ){}

  generateNewMentalMethGame$ = createEffect(() =>
    this._action$.pipe(
      ofType(mentalMathAction.loadNewMentalMathematicGameAction),
      mergeMap(({ gameLevel }) =>
        this._mentalGameService.getMentalMathematicData(gameLevel).pipe(
          switchMap( res => [
            mentalMathAction.loadNewMentalMathematicGameCompleteAction({ mentalMathData: res }),
            gameTextAction.setTextIntroductionAction({
              gameTitle: res.gameTextInformation.gamePresentation.gameTitle,
              presentationText: res.gameTextInformation.gamePresentation.presentationText
            }),
            gameTextAction.showPresentationTextAction(),
            commonAction.displayMessageAction({
              message: { title: 'Success chargement du calcul mental', message: "", isOnError: false }
            })
          ])
        )
      ),
      catchError(error => {
        return of(mentalMathAction.loadNewMentalMathematicGameFailedAction(),
        commonAction.displayMessageAction({
          message: { title: 'Echec chargement du calcul mental', message: error, isOnError: true }
        }))
      })
    )
  );

  prepareOperationTimer$ = createEffect(() =>
    this._action$.pipe(
      ofType(mentalMathAction.prepareOperationTimer),
      switchMap(() =>
        timer(2000).pipe(
          map(() => mentalMathAction.startOperationTimer()
       ))
    ))
  );

  startOperationTimer$ = createEffect(() =>
    this._action$.pipe(
      ofType(mentalMathAction.startOperationTimer),
      switchMap(() =>
        interval(1000).pipe(
          map(() => mentalMathAction.tickOperationTimer()),
          takeUntil(this._action$.pipe(ofType(mentalMathAction.stopOperationTimer)
          ))
        ))
  ));

  tickOperationTimer$ = createEffect(() =>
    this._action$.pipe(
      ofType(mentalMathAction.tickOperationTimer),
      switchMap(() =>
      this._store.pipe(select(selectors.remainingTimeSelector()),
      take(1),
      map((remainingTime) => {
        const nextReamainingTime = remainingTime! - 1;

        if(nextReamainingTime <= 0) {
          return mentalMathAction.prepareNextOperationAcion()
        }
        console.log(nextReamainingTime)
        return mentalMathAction.updateRemainingTime({ remainingTime: nextReamainingTime });
      })
      ))
  ));

  prepareNextOperation$ = createEffect(() =>
     this._action$.pipe(
    ofType(mentalMathAction.prepareNextOperationAcion),
    withLatestFrom(
      this._store.select(selectors.activeOperationIndexSelector),
      this._store.select(selectors.operationListSelector)
    ),
    switchMap(([_, index, list]) => {
      if(index < list.length - 1)
        return concat(
          of(
            mentalMathAction.stopOperationTimer(),
            mentalMathAction.isActiveOperationVisibleAction({ isVisible: false })
          ),
          timer(1000).pipe(
            switchMap(() =>
              of(
                mentalMathAction.incrementBadResponseAction(),
                mentalMathAction.nextOperationAction(),
                mentalMathAction.isActiveOperationVisibleAction({ isVisible: true }),
                mentalMathAction.prepareOperationTimer()
              )
            )
          )
        )

      return of(
        mentalMathAction.incrementBadResponseAction(),
        mentalMathAction.stopOperationTimer(),
        mentalMathAction.loadEndGameTextAction(),
        gameTextAction.showEndTextAction()
      )
    }
    )
  ));

endGameAction$ = createEffect(() =>
  this._action$.pipe(
    ofType(mentalMathAction.loadEndGameTextAction),
    switchMap(() =>
      this._gameTextInformationService.getGameTextInformation().pipe(
        withLatestFrom(this._store.pipe(select(selectors.badResponseSelector))),
        switchMap(([gameText, actualBadResponse]) => {
          console.log(gameText, actualBadResponse);
          let selectErrorLevel =  gameText?.gameEndParameterByLevels.find(endParam => {
            return endParam.minError <= actualBadResponse && endParam.maxError >= actualBadResponse;
          });
          return of(
            gameTextAction.setEndTextAction({
              endErrorLevel: selectErrorLevel!.endResultLevel,
              endText: selectErrorLevel!.endGameText.endText,
              endTitle: selectErrorLevel!.endGameText.endTitle,
            })
          )
        })
        )
      )
    )
  )
}
