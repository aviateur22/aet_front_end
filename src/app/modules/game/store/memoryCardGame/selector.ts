import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IGameSate } from "../state";
import { mapToGameTextInformation, mapToCardGame } from "../../mapper/store-object-to-model-instance-mapper";

export const selectGameState = createFeatureSelector<IGameSate>('gameState');

// Selector memoryCardState
export const selectMemoryCardState = createSelector(
  selectGameState,
  (state: IGameSate) => state.memoryCardState
);

// Selector les texts du jeu
export const selectGameTextInformation = createSelector(
  selectGameState,
  (state: IGameSate) => state.memoryCardState.cardGame.gameTextInformation
);

// Selecteur sur la carte qui est à trouver
export const selectCardToFindInGameState = createSelector(
  selectGameState,
  (state: IGameSate) => state.memoryCardState.cardGame.cardToFindInGame
);

// Selecteur sur la carte qui est à trouver
export const selectCardGameState = createSelector(
  selectGameState,
  (state: IGameSate) => state.memoryCardState.cardGame
);

export const isGameLoadingSelector = createSelector(selectMemoryCardState, (state) => state.isGameLoading);
export const isLoadingSuccessSelector = createSelector(selectMemoryCardState, (state) => state.isLoadingSuccess);
export const returnCardInGameSelector = createSelector(selectMemoryCardState, (state) => state.cardInGame);
export const isGameReadyToPlaySelector = createSelector(selectMemoryCardState, (state) => state.isGameReadyToPlay);


export const presentationTextSelector = createSelector(selectGameTextInformation, (state) => state.presentationText);
export const isInstructionVisibleSelector = createSelector(selectGameTextInformation, (state) => state.textVisibility.isInstructionVisible);
export const isEndGameInstructionVisibleSelector = createSelector(selectGameTextInformation, (state) => state.textVisibility.isEndGameInstructionVisible);
export const endTextVictorySelector = createSelector(selectGameTextInformation, state => state.gameVictoryText);
export const endTextLostSelector = createSelector(selectGameTextInformation, state => state.gameLostText);

export const gameTextInformationSelector = createSelector(selectGameTextInformation, (state) => mapToGameTextInformation(state));

export const cardGameSelector = createSelector(selectCardGameState, (state) => mapToCardGame(state));
export const cardsSelector = createSelector(selectCardGameState, (state) => state.cards);
export const timeToObserveBeforeStartSelector = createSelector(selectCardGameState, (state) => state.timeToObserveBeforeStart);
export const cardToFindQuantitySelector = createSelector(selectCardGameState, (state) => state.cardToFindQuantity);
export const isGameFinishSelector = createSelector(selectCardGameState, (state) => state.isGameFinish);
export const isGameWinSelector = createSelector(selectCardGameState, (state) => state.isGameWin);

export const isCardToFindVisibleSelector = createSelector(selectCardToFindInGameState, (state) => state.isCardVisible);
export const cardToFindInGameSelector = createSelector(selectCardToFindInGameState, (state) => state);
