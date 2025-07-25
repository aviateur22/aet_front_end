import { IGameTextInformationDto } from "../commonModel/game-text-information.dto"

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
  cardImage: ICardImageDto,
  isCardToFind: boolean
}

/**
 * Données composant une carte du jeu
 */
export interface ICardToFindDto {
  cardImage: ICardImageDto,
  cardTextExplanation: string
}

/**
 * Path image recto et verso d'une carte
 */
export interface ICardImageDto {
  cardFrontImageName: string,
  cardBackImageName: string
}
