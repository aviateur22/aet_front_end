import { createSelector } from "@ngrx/store";
import { IAppState } from "../../../../store/state";

export const selector = (state: IAppState) => state.gameState;

export const memoryCardGameLoadingSelector = createSelector(selector, (state) => state.memoryCardState.isGameLoading);
export const memoryCardGameLoadingSuccessSelector = createSelector(selector, (state) => state.memoryCardState.isLoadingSuccess);
export const memoryCardGameSelector = createSelector(selector, (state) => state.memoryCardState.memoryCardGame);
export const cardsSelector = createSelector(selector, (state) => state.memoryCardState.memoryCardGame.cards);
export const isInstructionVisibleSelector = createSelector(selector, (state) => state.memoryCardState.memoryCardGame.gameTextVisibility.isInstructionVisible);
export const isCardToFindVisibleSelector = createSelector(selector, (state) => state.memoryCardState.memoryCardGame.isCardToFindVisible);
export const isEndGameInstructionVisibleSelector = createSelector(selector, (state) => state.memoryCardState.memoryCardGame.gameTextVisibility.isEndGameInstructionVisible);
