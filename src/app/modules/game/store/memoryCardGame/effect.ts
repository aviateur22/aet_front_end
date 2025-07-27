import { GameApiService } from "../../memory-game-card/services/game-api.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as memoryGameAction from './action';
import * as commonAction from './../../../common-component/store/action';
import { catchError, concatMap, concatWith, from, interval, map, mergeMap, of, switchMap, take, tap, timer, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { IAppState } from "../../../../store/state";
import { Store } from "@ngrx/store";
import { GameLevel } from "../../memory-game-card/models/game-level.model";
import * as gameTextAction from '../gameText/action';

@Injectable()
export class MemoryCardEffect {
  constructor(private _action$: Actions, private gameService: GameApiService, private _store: Store<IAppState>) {}

  getMemoryCardData$ = createEffect(() =>
    this._action$.pipe(
      ofType(memoryGameAction.generateNewGameAction),
      mergeMap(({ playerId }) =>
        this.gameService.getMemoryCardGameData(playerId, GameLevel.EASY).pipe(
          switchMap(res => [
            memoryGameAction.generateNewGameActionCompleteAction({memoryCardGameData: res}),
            gameTextAction.setTextIntroductionAction({
              gameTitle: res.gameTextInformation.gamePresentation.gameTitle,
              presentationText: res.gameTextInformation.gamePresentation.presentationText
            }),
          ])
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

generateNewGameActionCompleteAction$ = createEffect(() =>
  this._action$.pipe(
    ofType(memoryGameAction.generateNewGameActionCompleteAction),
    map(action => {
      return gameTextAction.showPresentationTextAction();
    })
  )
)

  displayBackEffect$ = createEffect(() =>
  this._action$.pipe(
    ofType(memoryGameAction.displayBackOfAllGameCardsAction),
    withLatestFrom(this._store.select(state => state.gameState.memoryCardState.cardGame.cards)),
    switchMap(([_, cards]) =>
      from(cards).pipe(                // emits one card at a time
        concatMap((card) =>
          timer(200).pipe(    // delay each card by 1 sec
            map(() => memoryGameAction.turnCardToBackInitialisationAction({ cardId: card.id })
          )
        )
      ),
      concatWith(
        of(memoryGameAction.setGameIsReadyToPlayAction())
      )
    )
  ))
);
}
