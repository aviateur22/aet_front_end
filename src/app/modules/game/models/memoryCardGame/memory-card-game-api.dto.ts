import { IGameTextInformationDto } from "../game-api.dto"

export interface IMemoryCardGameDataDto {
  gameTextInformation: IGameTextInformationDto,
  cardToFindInGame: ICardImageDto,
  numberOfCardColumn: number,
  numberOfCardRow: number,
  cards: ICardDto [],
  gameLevel: string,
  timeToObserveBeforeStart: number
  cardToFindQuantity: number,
  maxErrorQuantity: number
}

/**
 * Données composant une carte du jeu
 */
export interface ICardDto {
  id: number,
  cardPosition: ICardPositionDto,
  cardImages: ICardImageDto,
  isCardToFind: boolean
}

/**
 * Position en X et Y d'une carte
 */
export interface ICardPositionDto {
  positionX: number,
  positionY: number,
}

/**
 * Path image recto et verso d'une carte
 */
export interface ICardImageDto {
  cardFrontImagePath: string,
  cardBackImagePath: string
}
