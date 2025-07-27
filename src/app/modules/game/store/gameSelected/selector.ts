import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IGameSate } from "../state";

const selectGameState = createFeatureSelector<IGameSate>('gameState');

const gameSelectedState = createSelector(
  selectGameState,
  (state: IGameSate) => state.selectedGame
);

export const gameSelectedSelector = createSelector(gameSelectedState, (state) => state.gameSelected);


