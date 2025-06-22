import { GameApiService } from "../../services/game-api.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as memoryGameAction from './action';
import * as commonAction from './../../../common-component/store/action';
import { catchError, mergeMap, of, switchMap, tap } from "rxjs";
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
      catchError(error=> {
        return of(
          memoryGameAction.getMemoryCardGameFailedAction(),
          commonAction.displayMessageAction({
          message: {title: 'Echec du chargement du jeux carte', message: error.error.error, isOnError: true}
        }))
      })
    )
  );

  /**
   * Affichage de log
   */
  getMemoryCardGameComplete$ = createEffect(() =>
    this._action$.pipe(
      ofType(memoryGameAction.getMemoryCardGameCompleteAction),
      tap(action => console.log('getMemoryCardGameComplete Effect:', action.memoryCardGameData))
    ),
    { dispatch: false }
  );

  /**
   * Affichage de log
   */
  getMemoryCardGameFailed$ = createEffect(() =>
    this._action$.pipe(
      ofType(memoryGameAction.getMemoryCardGameFailedAction),
      tap(action => console.log('getMemoryCardGameFailed Effect:', action))
    ),
    { dispatch: false }
  );
}
