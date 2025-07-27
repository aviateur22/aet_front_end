import { createReducer, on } from "@ngrx/store";
import { IMentalMathDataState } from "./state";
import * as mentalMathAction from "./action";
import { mapToOperationCorrectionState, mapToOperationstate } from "../../mental-mathematic/mapper/dto-to-store-object-mapper";

export const initialMentalMathDataState: IMentalMathDataState = {
  isGameReadyToPlay: false,
  isGameLoading: false,
  isLoadingSuccess: false,
  mentalMathGame: {
    arePropoalResponseVisible: false,
    operations: [],
    corrections: [],
    badResponseCumultated: 0,
    isGameFinish: false,
    isGameWin: false,
    activeOperationId: 0,
    isActiveOperationVisible: false
  }
}

export const mentalMathReducers = createReducer (
  initialMentalMathDataState,
  on(mentalMathAction.resetMentalMathematicGameAction, () => initialMentalMathDataState),
  on(mentalMathAction.loadNewMentalMathematicGameCompleteAction, (state, { mentalMathData }) => ({
    ...state,
    isGameLoading: false,
    isLoadingSuccess: true,
    isGameReadyToPlay: true,
    mentalMathGame: {
      ...state.mentalMathGame,
      arePropoalResponseVisible: mentalMathData.option.isMultipleChoiceVisible,
      operations: mapToOperationstate(mentalMathData.operations),
      corrections: mapToOperationCorrectionState(mentalMathData.corrections)
    }
  })),
  on(mentalMathAction.nextOperationIdAction, (state, { operationId }) => {
    const selectOperation = state.mentalMathGame.operations.find(operation => operation.id == operationId);

    if(!selectOperation)
      return state;

    return {
      ...state, mentalMathGame: {
        ...state.mentalMathGame,
        activeOperationId: operationId
      }
    }
  }),
  on(mentalMathAction.isActiveOperationVisibleAction, (state, { isVisible }) => ({
    ...state, mentalMathGame: {
      ...state.mentalMathGame,
      isActiveOperationVisible: isVisible
      }
    })),
  on(mentalMathAction.decountRemainingTimeAction, (state, { remainingTime, operationId }) => {
    const updatedOperations = state.mentalMathGame.operations.map(operation => {
      if(operation.id != operationId)
        return operation;

      return {
        ...operation, timeToCalculate: {
          ...operation.timeToCalculate,
          time: remainingTime
        }
      }
    });

    return {
      ...state, mentalMathGame: {
        ...state.mentalMathGame,
        operations: updatedOperations
      }
    }
  }),
  on(mentalMathAction.selectProposalResponse, (state, { proposalResponseId, operationId }) => {
    const selectOperation = state.mentalMathGame.operations.map(operation => {
      if(operation.id != operationId)
        return operation;

      const updatedProposalResponses = operation.proposalResponse.map(response => ({
        ...response, isProposalSelected: response.id === proposalResponseId
      }));

      return {
        ...operation, proposalResponse: updatedProposalResponses
      }
    });

    return {
      ...state, mentalMathGame : {
        ...state.mentalMathGame,
          operations: selectOperation
      }
    }
  })
);
