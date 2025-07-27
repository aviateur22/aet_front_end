import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MentalMathematicApiService } from "../../mental-mathematic/service/mental-mathematic-api.service";
import * as mentalMathAction from "./action";
import { catchError, mergeMap, of, switchMap } from "rxjs";
import * as commonAction from './../../../common-component/store/action';
import * as gameTextAction from "../gameText/action";

@Injectable()
export class MentalMathematicEffect {
  constructor(private _action$: Actions, private _mentalGameService: MentalMathematicApiService){}

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
}
