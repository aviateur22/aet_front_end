import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IGameSate } from "../state";
import { mapDtoToEndResultLevel } from "../../game-text/mapper/dto-to-model-instance-mapper";

export const selectGameState = createFeatureSelector<IGameSate>('gameState');

export const selectGameTextInformation = createSelector(
  selectGameState,
  (state: IGameSate) => state.gameTextState
);

export const presentationTextSelector = createSelector(selectGameTextInformation, (state) => state.presentationText);
export const gameTitleSelector = createSelector(selectGameTextInformation, (state) => state.gameTitle);
export const isInstructionVisibleSelector = createSelector(selectGameTextInformation, (state) => state.textVisibility.isInstructionVisible);
export const isEndGameInstructionVisibleSelector = createSelector(selectGameTextInformation, (state) => state.textVisibility.isEndGameTextVisible);
export const endTextTitleSelector = createSelector(selectGameTextInformation, state => state.selectedEndTitle);
export const endTextSelector = createSelector(selectGameTextInformation, state => state.selectedEndText);
export const isWordingVisibleSelector = createSelector(selectGameTextInformation, (state) => state.textVisibility.isWordingVisible);
export const selectWordSelector = createSelector(selectGameTextInformation, (state) => state.selectWord);
export const errorLevelSelector = createSelector(selectGameTextInformation, (state) => mapDtoToEndResultLevel(state.endErrorLevel));


