import { IBaseGameState } from "../model";

export interface IMemoryCardGameState extends IBaseGameState {
  cardToFindInGame: ICardImageState;
  numberOfCardColumn: number;
  numberOfCardRow: number;
  cards: ICardState[];
  timeToObserveBeforeStart: number;
  cardToFindQuantity: number;
  maxErrorQuantity: number;
  isCardToFindVisible: boolean;
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
