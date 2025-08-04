import { createReducer, on } from "@ngrx/store";
import { IMentalMathDataState, IMentalMathState } from "./state";
import * as mentalMathAction from "./action";
import { mapToOperationstate } from "../../mental-mathematic/mapper/dto-to-store-object-mapper";

export const initialMentalMathDataState: IMentalMathDataState = {
  isGameReadyToPlay: false,
  isGameLoading: false,
  isLoadingSuccess: false,
  mentalMathGame: {
    arePropoalResponseVisible: false,
    operations: [],
    badResponseCumultated: 0,
    isGameFinish: false,
    isGameWin: false,
    activeOperationIndex: 0,
    isActiveOperationVisible: false,
    mentalMathStartTime: new Date(),
    mentalMathEndTime: new Date()
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
    }
  })),
  // on(mentalMathAction.nextOperationIndexAction, (state, { activeOperationIndex }) => {
  //   return {
  //     ...state, mentalMathGame: {
  //       ...state.mentalMathGame,
  //       activeOperationIndex: activeOperationIndex
  //     }
  //   }
  // }),
  on(mentalMathAction.isActiveOperationVisibleAction, (state, { isVisible }) => ({
    ...state, mentalMathGame: {
      ...state.mentalMathGame,
      isActiveOperationVisible: isVisible
      }
    })),
  on(mentalMathAction.updateRemainingTime, (state, { remainingTime,  }) => {
    // Index de l'operation qui est actif
    const activeOperationIndex = state.mentalMathGame.activeOperationIndex;

    const updatedOperations = state.mentalMathGame.operations.map((operation, index) => {
      if(index !== activeOperationIndex)
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
  on(mentalMathAction.selectProposalResponseAction, (state, { proposalResponseId }) => {
    // Index de l'operation qui est actif
    const activeOperationIndex = state.mentalMathGame.activeOperationIndex;

    const selectOperation = state.mentalMathGame.operations.map((operation, index) => {
      if(index != activeOperationIndex)
        return operation;

      const playerAnswerFromSelection = operation.proposalResponse.find(proposalResponse => proposalResponseId === proposalResponse.id)?.proposalResponse ?? 0;
      console.log(proposalResponseId);

      const updatedProposalResponses = operation.proposalResponse.map(response => ({
        ...response, isProposalSelected: response.id === proposalResponseId
      }));



      return {
        ...operation,
        playerResponse: {
          isAnswerValid: operation.validOperationResponse === playerAnswerFromSelection,
          playerAnswer: playerAnswerFromSelection
        },
        proposalResponse: updatedProposalResponses
      }
    });

    return {
      ...state, mentalMathGame : {
        ...state.mentalMathGame,
          operations: selectOperation
      }
    }
  }),
  on(mentalMathAction.registerPlayerAnswerAction, (state, { playerResponse }) => {
    // Index de l'operation qui est actif
    const activeOperationIndex = state.mentalMathGame.activeOperationIndex;

    const selectOperation = state.mentalMathGame.operations.map((operation, index) => {
      if(index != activeOperationIndex)
        return operation;

        return {
          ...operation, playerResponse
        }
      });

    return {
      ...state, mentalMathGame: {
        ...state.mentalMathGame, operations: selectOperation
      }
    }
  }),
  on(mentalMathAction.incrementBadResponseAction, (state) => {
    // Index de l'operation qui est actif
    const activeOperationIndex = state.mentalMathGame.activeOperationIndex;
    const actualBadResponse = state.mentalMathGame.badResponseCumultated;

    if(!state.mentalMathGame.operations[activeOperationIndex].playerResponse.isAnswerValid)
      return {
      ...state, mentalMathGame: {
        ...state.mentalMathGame,
        badResponseCumultated: actualBadResponse + 1
      }
    }
    return state;
  }),
  on(mentalMathAction.nextOperationAction, (state) => ({
    ...state, mentalMathGame: {
      ...state.mentalMathGame,
      activeOperationIndex: state.mentalMathGame.activeOperationIndex + 1
    }
  })),
  on(mentalMathAction.loadEndGameTextAction, (state) =>({
    ...state, mentalMathGame: {
      ...state.mentalMathGame,
      isGameFinish: true,
      isGameWin: state.mentalMathGame.badResponseCumultated === 0 ? true : false,

    }
  }))
);

