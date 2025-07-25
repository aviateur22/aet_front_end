import { IGameTextInformationState } from "../gameCommon/game-common.state"

export interface  IMemoryCardState {
    isGameReadyToPlay: boolean,
    isGameLoading: boolean,
    isLoadingSuccess: boolean,
    cardGame: ICardGameState,
    cardInGame: ICardState | null
  }

  export interface ICardGameState {
    gameTextInformation: IGameTextInformationState,
    cardToFindInGame: ICardToFindState,
    cards: ICardState[],
    timeCountDown: ITimeCountDownSate,
    cardToFindQuantity: number,
    maxErrorQuantity: number,
    gameLevel: string,
    isGameFinish: boolean,
    isGameWin: boolean,
    badResponseCumultated: number
  }

  export interface ICardState  {
    id: number,
    cardImages: ICardImageState,
    isCardToFind: boolean,
    isCardReturned: boolean,
    isMarkToShow: boolean
  }

  export interface ICardImageState {
    cardFrontImageName: string,
    cardBackImageName: string
  }

  export interface ICardToFindState {
    cardImages: ICardImageState,
    isCardVisible: boolean,
    cardTextExplanation: string
  }

  export interface ITimeCountDownSate {
    timeToObserveBeforeStart: number,
    isCountDownVisible: boolean
  }
