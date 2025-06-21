import { IGameSate } from "../state";
import { createReducer, on } from "@ngrx/store";
import * as memoryCardAction from './action';
import { mapToMemoryCardGameStateInitiilalizer } from "./mapper/dto-to-store-object-mapper";
import { IMemoryCardGameState } from "./model";

export interface  IMemoryCardState {
    isGameLoading: boolean,
    isLoadingSuccess: boolean,
    memoryCardGame: IMemoryCardGameState
  }

export const initialMemoryCardState: IMemoryCardState = {
  isGameLoading: false,
  isLoadingSuccess: false,
  memoryCardGame: {
    cardToFindInGame: {
      cardFrontImagePath: "",
      cardBackImagePath: ""
    },
    numberOfCardColumn: 0,
    numberOfCardRow: 0,
    cards: [],
    timeToObserveBeforeStart: 0,
    cardToFindQuantity: 0,
    maxErrorQuantity: 0,
    isCardToFindVisible: false,
    gameTextInformation: {
      congratulationWords: [],
      loosingWords: [],
      gameLostText: "",
      gameVictoryText: "",
      presentationText: ""
    },
    gameLevel: "",
    gameTextVisibility: {
      isInstructionVisible: false,
      isEndGameInstructionVisible: false
    }
  }
}

export const memoryCardReducers = createReducer(
  initialMemoryCardState,
  on(memoryCardAction.getMemoryCardGameAction, (state)=>({
    ...state, memoryCard: {
      ...state.memoryCardGame,
      isGameLoading: true
    }
  })),
  on(memoryCardAction.getMemoryCardGameCompleteAction, (state, { memoryCardGameData }) => ({
    ...state, memoryCard: {
      ...state,
      isGameLoading: false,
      isLoadingSuccess: true,
      memoryCardGame: mapToMemoryCardGameStateInitiilalizer(memoryCardGameData)
    }
  })),
  on(memoryCardAction.getMemoryCardGameFailedAction, (state) => ({
    ...state, memoryCard : {
      ...state,
      isGameLoading:false,
      isLoadingSuccess: false
    }
  })),
  on(memoryCardAction.displayFrontOfAllGameCards, (state) => {
    const returnCards = state.memoryCardGame.cards.map(card => ({
      ...card,
      isCardReturned: true
    }));

    return {
      ...state, memoryCard: {
      ...state,
      isGameLoading: false,
      isLoadingSuccess: true,
      memoryCardGame: {
        ...state.memoryCardGame,
        gameCards: {
          ...state.memoryCardGame,
          cards: returnCards
        }
      }
    }
    }
  }),
   on(memoryCardAction.displayBackOfAllGameCards, (state) => {
    const returnCards = state.memoryCardGame.cards.map(card => ({
      ...card,
      isCardReturned: false
    }));

    return {
      ...state, memoryCard: {
      ...state,
      isGameLoading: false,
      isLoadingSuccess: true,
      memoryCardGame: {
        ...state.memoryCardGame,
        gameCards: {
          ...state.memoryCardGame,
          cards: returnCards
        }
      }
    }
    }
  })
)
