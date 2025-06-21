import { createReducer } from "@ngrx/store";
import { IMemoryColorGameState } from "./model";

export interface  IMemoryColorState {
    isGameLoading: boolean,
    isLoadingSuccess: boolean,
    memoryCardGame: IMemoryColorGameState
  }

export const initialMemoryColorState: IMemoryColorState = {
  isGameLoading: false,
  isLoadingSuccess: false,
  memoryCardGame: {
    gameTextInformation: {
      congratulationWords: [],
      loosingWords: [],
      gameLostText: "",
      gameVictoryText: "",
      presentationText: ""
    },
    gameTextVisibility: {
      isInstructionVisible: false,
      isEndGameInstructionVisible: false
    }
  }
}

export const memoryColorReducers = createReducer(
  initialMemoryColorState
)
