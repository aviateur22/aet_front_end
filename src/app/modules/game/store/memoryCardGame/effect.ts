import { GameApiService } from "../../services/game-api.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as memoryGameAction from './action';
import * as commonAction from './../../../common-component/store/action';
import { catchError, mergeMap, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class MemoryCardEffect {
  constructor(private _action$: Actions, private gameService: GameApiService) {}

  getMemoryCardData$ = createEffect(() =>
    this._action$.pipe(
      ofType(memoryGameAction.getMemoryCardGameAction),
      mergeMap(({ playerId }) =>
        this.gameService.getMemoryCardGameData(playerId).pipe(
          switchMap(res => [memoryGameAction.getMemoryCardGameCompleteAction({memoryCardGameData: res})])
        )
      ),
      catchError(error=> of(
          memoryGameAction.getMemoryCardGameFailedAction(),
          commonAction.displayMessageAction({
          message: {title: 'Echec du chargement du jeux carte mémoire', message: error.error.error, isOnError: true}
        })))
    )
  )
}
