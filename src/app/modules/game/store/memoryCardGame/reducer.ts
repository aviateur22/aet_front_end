import { createReducer, on } from "@ngrx/store";
import * as memoryCardAction from './action';

import { mapToMemoryCardGameStateInitilalizer } from "../../mapper/dto-to-store-object-mapper";
import { IMemoryCardState } from "./state";

export const initialMemoryCardState: IMemoryCardState = {
  isGameLoading: false,
  isLoadingSuccess: null,
  cardGame: {
    cardToFindInGame: {
      cardImages: {
        cardFrontImagePath: "",
        cardBackImagePath: ""
      },
      isCardVisible: false
    },
    numberOfCardColumn: 0,
    numberOfCardRow: 0,
    cards: [],
    timeToObserveBeforeStart: 0,
    cardToFindQuantity: 0,
    maxErrorQuantity: 0,
    gameLevel: "",
    gameTextInformation: {
      congratulationWords: [],
      loosingWords: [],
      gameLostText: "",
      gameVictoryText: "",
      presentationText: "",
      textVisibility: {
        isInstructionVisible: true,
        isEndGameInstructionVisible: false
      }
    }
  }
}

export const memoryCardReducers = createReducer(
  initialMemoryCardState,
  on(memoryCardAction.getMemoryCardGameAction, (state) => ({
    ...state,
      isGameLoading: true

  })),
  on(memoryCardAction.getMemoryCardGameCompleteAction, (state, { memoryCardGameData }) => ({
    ...state,
      isGameLoading: false,
      isLoadingSuccess: true,
      cardGame: mapToMemoryCardGameStateInitilalizer(memoryCardGameData)
  })),
  on(memoryCardAction.getMemoryCardGameFailedAction, (state) => ({
    ...state,
      isGameLoading:false,
      isLoadingSuccess: false
  })),
  on(memoryCardAction.displayFrontOfAllGameCards, (state) => {
    const returnCards = state.cardGame.cards.map(card => ({
      ...card,
      isCardReturned: true
    }));

    return {
      ...state,
      isGameLoading: false,
      isLoadingSuccess: true,
      cardGame: {
        ...state.cardGame,
        cards: returnCards
      }
    }
  }),
   on(memoryCardAction.displayBackOfAllGameCards, (state) => {
    const returnCards = state.cardGame.cards.map(card => ({
      ...card,
      isCardReturned: false
    }));

    return {
      ...state,
      isGameLoading: false,
      isLoadingSuccess: true,
      cardGame: {
        ...state.cardGame,
        cards: returnCards
      }
    }
  })
)
