import { createReducer, on } from "@ngrx/store";
import * as memoryCardAction from './action';

import { mapToMemoryCardGameStateInitilalizer } from "../../mapper/dto-to-store-object-mapper";
import { IMemoryCardState } from "./state";


export const initialMemoryCardState: IMemoryCardState = {
  isGameLoading: false,
  isLoadingSuccess: false,
  isGameReadyToPlay: false,
  cardGame: {
    cardToFindInGame: {
      cardImages: {
        cardFrontImagePath: "",
        cardBackImagePath: ""
      },
      isCardVisible: false,
      cardTextExplanation: ""
    },
    numberOfCardColumn: 0,
    numberOfCardRow: 0,
    cards: [],
    timeToObserveBeforeStart: 0,
    cardToFindQuantity: 0,
    maxErrorQuantity: 0,
    gameLevel: "",
    isGameFinish: false,
    isGameWin: false,
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
    },
  },
  cardInGame: null
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
  on(memoryCardAction.displayFrontOfAllGameCardsAction, (state) => {
    const returnCards = state.cardGame?.cards.map(card => ({
      ...card,
      isCardReturned: true
    })) ?? [];

    return {
      ...state,
      cardGame: {
        ...state.cardGame!,
        cards: returnCards
      }
    }
  }),
  on(memoryCardAction.turnCardToBackInitialisationAction, (state, { cardId }) => {
  const updatedCards = state.cardGame.cards.map(card =>
    card.id === cardId ? { ...card, isCardReturned: true } : card
  );

  return {
    ...state,
    cardGame: {
      ...state.cardGame,
      cards: updatedCards
    }
  };
}),
on(memoryCardAction.setGameIsReadyToPlayAction, (state) => ({
  ...state,
  isGameReadyToPlay: true
})),
on(memoryCardAction.finCardInGameAction, (state, { cardId }) => ({
    ...state, cardInGame: state.cardGame.cards.find(card => card.id === cardId) || state.cardInGame
  })),
on(memoryCardAction.showFrontOfCardClickedAction, (state, { cardId }) => ({
    ...state, cardGame: {
      ...state.cardGame,
      cards: state.cardGame.cards.map(card =>
        card.id === cardId ? { ...card, isCardReturned: !card.isCardReturned } : card
      )
    }
  })),
on(memoryCardAction.turnBackOfCardClickedAction, (state, { cardId }) => ({
    ...state, cardGame: {
      ...state.cardGame,
      cards: state.cardGame.cards.map(card =>
        card.id === cardId && card.isCardReturned ? { ...card, isCardReturned: false } : card
      )
    }
  })),
on(memoryCardAction.countDownBeforeCardReturnAction,(state, { timeToRemove })=>({
  ...state, cardGame : {
    ...state.cardGame,
    timeToObserveBeforeStart: state.cardGame.timeToObserveBeforeStart - timeToRemove
  }
})),
on(memoryCardAction.showPresentationTextAction,(state) => ({
  ...state, cardGame : {
    ...state.cardGame,
    gameTextInformation: {
      ...state.cardGame.gameTextInformation,
      textVisibility: {
        ...state.cardGame.gameTextInformation.textVisibility,
        isInstructionVisible: true
      }
    }
  }
})),
on(memoryCardAction.hidePresentationTextAction,(state) => ({
  ...state, cardGame : {
    ...state.cardGame,
    gameTextInformation: {
      ...state.cardGame.gameTextInformation,
      textVisibility: {
        ...state.cardGame.gameTextInformation.textVisibility,
        isInstructionVisible: false
      }
    }
  }
})),
on(memoryCardAction.showCardToFindAction, (state) =>({
  ...state, cardGame : {
    ...state.cardGame,
    cardToFindInGame : {
      ...state.cardGame.cardToFindInGame,
      isCardVisible: true
    }
  }
})),
on(memoryCardAction.hideCardToFindAction, (state) => ({
  ...state, cardGame : {
    ...state.cardGame,
    cardToFindInGame : {
      ...state.cardGame.cardToFindInGame,
      isCardVisible: false
    }
  }
})),
on(memoryCardAction.setIsGameFinishAction, (state, { isGameFinish }) => ({
 ...state, cardGame: {
    ...state.cardGame,
    isGameFinish: isGameFinish
  }
})),
on(memoryCardAction.setIsGameWinAction, (state,  { isGameWin }) => ({
  ...state, cardGame: {
    ...state.cardGame,
    isGameWin: isGameWin
  }
}))

)
