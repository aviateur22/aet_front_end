import { IGameTextInformationState } from "../gameCommon/game-common.state"

export interface  IMemoryCardState {
    isGameReadyToPlay: boolean,
    isGameLoading: boolean,
    isLoadingSuccess: boolean | null,
    cardGame: ICardGameState,
    cardInGame: ICardState | null
  }

  export interface ICardGameState {
    gameTextInformation: IGameTextInformationState,
    cardToFindInGame: ICardToFindState,
    numberOfCardColumn: number,
    numberOfCardRow: number,
    cards: ICardState[],
    timeToObserveBeforeStart: number,
    cardToFindQuantity: number,
    maxErrorQuantity: number,
    gameLevel: string
  }

  export interface ICardState  {
    id: number,
    cardPosition: ICardPositionState,
    cardImages: ICardImageState,
    isCardToFind: boolean,
    isCardReturned: boolean,
    isMarkToShow: boolean
  }

  export interface ICardPositionState {
    positionX: number,
    positionY: number,
  }

  export interface ICardImageState {
    cardFrontImagePath: string,
    cardBackImagePath: string
  }

  export interface ICardToFindState {
    cardImages: ICardImageState,
    isCardVisible: boolean,
  }
