import { GameTextInformation, TextInformationVisibility } from "../models/commonModel/game-text-information.model";
import { CardToFind } from "../models/memoryCardGame/card-to-find.model";
import { Card } from "../models/memoryCardGame/card.model";
import { CardGame } from "../models/memoryCardGame/memory-card-game.model";
import { IGameTextInformationState } from "../store/gameCommon/game-common.state";
import { ICardGameState, ICardState, ICardToFindState } from "../store/memoryCardGame/state";



/**
 * Map un IMemoryCardGameState en MemoryCardGame
 * Cette function est applé que à l'initialisation du jeu
 * @param memoryCardState
 * @returns
 */
export function mapToCardGame(memoryCardState: ICardGameState): CardGame {
  console.log(memoryCardState);
  return new CardGame(
    mapToGameTextInformation(memoryCardState.gameTextInformation),
    mapToCardToFind(memoryCardState.cardToFindInGame),
    memoryCardState.numberOfCardColumn,
    memoryCardState.numberOfCardRow,
    memoryCardState.cards.map(card => mapToCard(card)),
    memoryCardState.gameLevel,
    memoryCardState.timeToObserveBeforeStart,
    memoryCardState.cardToFindQuantity,
    memoryCardState.maxErrorQuantity
  )
}

/**
 * Renvoie GameTextInformation un à partir d'un  IMemoryCardGameState
 * @param gameTextInformation
 * @returns
 */
export function mapToGameTextInformation(gameTextInformation: IGameTextInformationState): GameTextInformation {
  const gameText = gameTextInformation;

  return new GameTextInformation(
    gameText.congratulationWords,
    gameText.loosingWords,
    gameText.gameLostText,
    gameText.gameVictoryText,
    gameText.presentationText,
    gameText.textVisibility
  )
}

export function mapToCard(card: ICardState): Card {
  return new Card(
    card.id,
    card.cardPosition,
    card.cardImages,
    card.isCardToFind,
    card.isCardReturned,
    card.isMarkToShow
  )

}

export function mapToCardToFind(cardToFind: ICardToFindState): CardToFind {
  return new CardToFind(
    cardToFind.cardImages,
    cardToFind.isCardVisible
  );
}
