import { createSelector } from "@ngrx/store";
import { IAppState } from "../../../../store/state";
import { IGameSate } from "../state";

export const selector = (state: IAppState) => state.gameState;

export const isGameLoadingSelector = createSelector(selector, (state: IGameSate) => state.memoryCardState.isGameLoading);
export const isLoadingSuccessSelector = createSelector(selector, (state: IGameSate) => state.memoryCardState.isLoadingSuccess);
export const memoryCardGameSelector = createSelector(selector, (state: IGameSate) => state.memoryCardState.memoryCardGame);
export const cardsSelector = createSelector(selector, (state: IGameSate) => state.memoryCardState.memoryCardGame.cards);
export const isInstructionVisibleSelector = createSelector(selector, (state: IGameSate) => state.memoryCardState.memoryCardGame.gameTextVisibility.isInstructionVisible);
export const isCardToFindVisibleSelector = createSelector(selector, (state: IGameSate) => state.memoryCardState.memoryCardGame.isCardToFindVisible);
export const isEndGameInstructionVisibleSelector = createSelector(selector, (state: IGameSate) => state.memoryCardState.memoryCardGame.gameTextVisibility.isEndGameInstructionVisible);
