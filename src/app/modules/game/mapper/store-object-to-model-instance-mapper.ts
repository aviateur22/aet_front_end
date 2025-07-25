import { GameTextInformation, TextInformationVisibility } from "../models/commonModel/game-text-information.model";
import { CardToFind } from "../models/memoryCardGame/card-to-find.model";
import { Card } from "../models/memoryCardGame/card.model";
import { CardGame } from "../models/memoryCardGame/memory-card-game.model";
import { TimeCountDown } from "../models/memoryCardGame/time-count-down.model";
import { IGameTextInformationState } from "../store/gameCommon/game-common.state";
import { ICardGameState, ICardState, ICardToFindState, ITimeCountDownSate } from "../store/memoryCardGame/state";



/**
 * Map un IMemoryCardGameState en MemoryCardGame
 * Cette function est applé que à l'initialisation du jeu
 * @param memoryCardState
 * @returns
 */
export function mapToCardGame(memoryCardState: ICardGameState): CardGame {
  console.log(memoryCardState);
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
  )

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
