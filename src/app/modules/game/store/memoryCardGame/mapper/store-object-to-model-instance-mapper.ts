import { GameTextInformation } from "../../../models/game.model";
import { Card } from "../../../models/memoryCardGame/card.model";
import { MemoryCardGame } from "../../../models/memoryCardGame/memory-card-game.model";
import { ICardState, IMemoryCardGameState } from "../model";

/**
 * Map un IMemoryCardGameState en MemoryCardGame
 * Cette function est applé que à l'initialisation du jeu
 * @param memoryCardState
 * @returns
 */
export function mapToMemoryCardGame(memoryCardState: IMemoryCardGameState): MemoryCardGame {
  return new MemoryCardGame(
    mapToGameTextInformation(memoryCardState),
    memoryCardState.cardToFindInGame,
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
 * @param memoryCardState
 * @returns
 */
export function mapToGameTextInformation(memoryCardState: IMemoryCardGameState): GameTextInformation {
  const gameText = memoryCardState.gameTextInformation;
  return new GameTextInformation(
    gameText.congratulationWords,
    gameText.loosingWords,
    gameText.gameLostText,
    gameText.gameVictoryText,
    gameText.presentationText
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
