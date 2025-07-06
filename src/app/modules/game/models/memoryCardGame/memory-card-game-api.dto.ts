import { IGameTextInformationDto } from "../commonModel/game-text-information.dtol"

export interface ICardGameDto {
  gameTextInformation: IGameTextInformationDto,
  cardToFindInGame: ICardToFindDto,
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
  cardImages: ICardImageDto,
  isCardToFind: boolean
}

/**
 * Données composant une carte du jeu
 */
export interface ICardToFindDto {
  card: ICardImageDto,
  cardTextExplanation: string
}

/**
 * Path image recto et verso d'une carte
 */
export interface ICardImageDto {
  cardFrontImagePath: string,
  cardBackImagePath: string
}
