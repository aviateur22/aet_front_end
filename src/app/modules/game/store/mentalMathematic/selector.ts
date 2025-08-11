import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IGameSate } from "../state";
import { mapToOperationModel } from "../../mental-mathematic/mapper/store-object-to-model-instance-mapper";
import { state } from "@angular/animations";

const selectGameState = createFeatureSelector<IGameSate>('gameState');

const mentalMathematicGameState = createSelector(
  selectGameState,
  (state: IGameSate) => state.mentalMathState
);

export const isGameLoadingSelector = createSelector(mentalMathematicGameState, (state) => state.isGameLoading);
export const isLoadingSuccessSelector = createSelector(mentalMathematicGameState, (state) => state.isLoadingSuccess);
export const isGameReadyToPlaySelector = createSelector(mentalMathematicGameState, (state) => state.isGameReadyToPlay);
export const areProposalResponseVisibleSelector = createSelector(mentalMathematicGameState, (state) => state.mentalMathGame.arePropoalResponseVisible);
export const operationListSelector = createSelector(mentalMathematicGameState, (state) => state.mentalMathGame.operations);

export const activeOperationIndexSelector = createSelector(mentalMathematicGameState, (state) => state.mentalMathGame.activeOperationIndex);
export const activeOperationSelector = createSelector(
  operationListSelector, activeOperationIndexSelector,
  (operations, activeOperationIndexId) => operations.at(activeOperationIndexId) ?? null
);
export const isActiveOperationVisibleSelector = createSelector(mentalMathematicGameState, (state) => state.mentalMathGame.isActiveOperationVisible);
export const activeTimeToCalculateSelector = createSelector(activeOperationSelector, (state) => state?.timeToCalculate.time);
export const activeOperationModelSelector = createSelector(
  activeOperationSelector, isActiveOperationVisibleSelector, (operation, isOperationVisible) => {
    if(!operation)
      return null;

    return mapToOperationModel(operation, isOperationVisible)
});
export const selectMentalCardSelector = (mentalCardId: number, activeOperationId: number) =>
  createSelector(mentalMathematicGameState, (state) => state.mentalMathGame.operations[activeOperationId].mentalCards.find(mentalCard => mentalCard.id === mentalCardId)?.isCardReturn);

export const getValidCalculResponseOnActiveOperationSelector = (activeOperationId: number) =>
  createSelector(mentalMathematicGameState, (state) => state.mentalMathGame.operations[activeOperationId].validOperationResponse);

export const remainingTimeSelector = () => createSelector(activeOperationSelector, (state) => state?.timeToCalculate.time);
export const badResponseSelector = createSelector(mentalMathematicGameState, (state) => state.mentalMathGame.badResponseCumultated);

export const isUnselectedAnswerVisibleSelector = createSelector(activeOperationModelSelector, state => state!.isUnselectedAnswerTextVisible);
export const activePlayerAnswerSelector = createSelector(activeOperationModelSelector, state => state?.playerAnswer);




