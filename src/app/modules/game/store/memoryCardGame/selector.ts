import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IGameSate } from "../state";
import { mapToGameTextInformation, mapToCardGame } from "../../mapper/store-object-to-model-instance-mapper";

export const selectGameState = createFeatureSelector<IGameSate>('gameState');

// Selector for memoryCardState
export const selectMemoryCardState = createSelector(
  selectGameState,
  (state: IGameSate) => state.memoryCardState
);

export const isGameLoadingSelector = createSelector(selectMemoryCardState, (state) => state.isGameLoading);
export const isLoadingSuccessSelector = createSelector(selectMemoryCardState, (state) => state.isLoadingSuccess);
export const presentationTextSelector = createSelector(selectMemoryCardState, (state) => state.cardGame.gameTextInformation.presentationText);
export const isPresentationTextVisibleSelector = createSelector(selectMemoryCardState, (state) => state.cardGame.gameTextInformation.textVisibility.isInstructionVisible);

export const cardGameSelector = createSelector(selectMemoryCardState, (state) => mapToCardGame(state.cardGame));
export const cardsSelector = createSelector(selectMemoryCardState, (state) => state.cardGame.cards);
export const isInstructionVisibleSelector = createSelector(selectMemoryCardState, (state) => state.cardGame.gameTextInformation.textVisibility.isInstructionVisible);
export const isCardToFindVisibleSelector = createSelector(selectMemoryCardState, (state) => state.cardGame.cardToFindInGame.isCardVisible);
export const isEndGameInstructionVisibleSelector = createSelector(selectMemoryCardState, (state) => state.cardGame.gameTextInformation.textVisibility.isEndGameInstructionVisible);
export const gameTextInformationSelector = createSelector(selectMemoryCardState, (state) => {
  console.log('gameTextInformationSelector');
return  mapToGameTextInformation(state.cardGame.gameTextInformation)}
);

export const cardToFindInGameSelector = createSelector(selectMemoryCardState, (state) => state.cardGame.cardToFindInGame.cardImages);
export const isCardToFindInGameVisible = createSelector(selectMemoryCardState, (state) => state.cardGame.cardToFindInGame.isCardVisible);
