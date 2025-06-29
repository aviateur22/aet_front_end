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
export const selectCardToFindInGame = createSelector(
  selectGameState,
  (state: IGameSate) => state.memoryCardState.cardGame.cardToFindInGame
);

export const isGameLoadingSelector = createSelector(selectMemoryCardState, (state) => state.isGameLoading);
export const isLoadingSuccessSelector = createSelector(selectMemoryCardState, (state) => state.isLoadingSuccess);
export const returnCardInGameSelector = createSelector(selectMemoryCardState, (state) => state.cardInGame);
export const isGameReadyToPlaySelector = createSelector(selectMemoryCardState, (state) => state.isGameReadyToPlay);


export const presentationTextSelector = createSelector(selectGameTextInformation, (state) => state.presentationText);
export const isPresentationTextVisibleSelector = createSelector(selectGameTextInformation, (state) => state.textVisibility.isInstructionVisible);
export const isInstructionVisibleSelector = createSelector(selectGameTextInformation, (state) => state.textVisibility.isInstructionVisible);
export const isEndGameInstructionVisibleSelector = createSelector(selectGameTextInformation, (state) => state.textVisibility.isEndGameInstructionVisible);
export const gameTextInformationSelector = createSelector(selectGameTextInformation, (state) => mapToGameTextInformation(state));

export const cardGameSelector = createSelector(selectMemoryCardState, (state) => mapToCardGame(state.cardGame));
export const cardsSelector = createSelector(selectMemoryCardState, (state) => state.cardGame.cards);

export const isCardToFindVisibleSelector = createSelector(selectCardToFindInGame, (state) => state.isCardVisible);
export const cardToFindInGameSelector = createSelector(selectCardToFindInGame, (state) => state.cardImages);
export const isCardToFindInGameVisible = createSelector(selectCardToFindInGame, (state) => state.isCardVisible);
