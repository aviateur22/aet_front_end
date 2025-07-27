import { CardToFind } from "../models/card-to-find.model";
import { Card } from "../models/card.model";
import { CardGame } from "../models/memory-card-game.model";
import { TimeCountDown } from "../models/time-count-down.model";
import { ICardGameState, ICardState, ICardToFindState, ITimeCountDownSate } from "../../store/memoryCardGame/state";



/**
 * Map un IMemoryCardGameState en MemoryCardGame
 * Cette function est applé que à l'initialisation du jeu
 * @param memoryCardState
 * @returns
 */
export function mapToCardGame(memoryCardState: ICardGameState): CardGame {
  return new CardGame(
    mapToCardToFind(memoryCardState.cardToFindInGame),
    memoryCardState.cards.map(card => mapToCard(card)),
    memoryCardState.gameLevel,
    mapTotimeCountDown(memoryCardState.timeCountDown),
    memoryCardState.cardToFindQuantity,
    memoryCardState.maxErrorQuantity,
    memoryCardState.isGameFinish,
    memoryCardState.isGameWin
  )
}

export function mapToCard(card: ICardState): Card {
  return new Card(
    card.id,
    card.cardImages,
    card.isCardToFind,
    card.isCardReturned,
    card.isMarkToShow
  );
}

export function mapToCardToFind(cardToFind: ICardToFindState): CardToFind {
  return new CardToFind(
    cardToFind.cardImages,
    cardToFind.isCardVisible,
    cardToFind.cardTextExplanation
  );
}
export function mapTotimeCountDown(timeCountDown: ITimeCountDownSate): TimeCountDown {
  return new TimeCountDown(
    timeCountDown.timeToObserveBeforeStart,
    timeCountDown.isCountDownVisible
  );
}
