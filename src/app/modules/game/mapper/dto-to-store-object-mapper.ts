import { IGameTextInformationDto } from "../models/commonModel/game-text-information.dtol";
import { ICardGameDto, ICardDto, ICardImageDto, ICardToFindDto } from "../models/memoryCardGame/memory-card-game-api.dto";
import { IGameTextInformationState } from "../store/gameCommon/game-common.state";
import { INITIAL_ARE_CARDS_IN_GAME_RETURN, INITIAL_CARD_TO_FIND_VISIBILITY, INITIAL_IS_GAME_FINISH, INITIAL_IS_GAME_WIN, INITIAL_IS_MARK_ON_CARDS_IN_GAME_VISIBLE, INITIAL_PRESENTATION_END_TEXT_VISIBILITY, INITIAL_PRESENTATION_TEXT_VISIBILITY } from "../store/memoryCardGame/initial-state-value";
import { ICardGameState, ICardState, ICardToFindState } from "../store/memoryCardGame/state";

/**
 * Permets l'initialisation du state au démarrage du Memory Card Game
 * @param dto
 * @returns
 */
export function mapToMemoryCardGameStateInitilalizer(dto: ICardGameDto): ICardGameState {
  const cardGameState: ICardGameState = {
    gameTextInformation: mapToGameTextInformationStateInitializer(dto.gameTextInformation),
    cardToFindInGame: mapTocardToFindInGameInitilalizer(dto.cardToFindInGame),
    numberOfCardColumn: dto.numberOfCardColumn,
    numberOfCardRow: dto.numberOfCardRow,
    cards: dto.cards.map(card => mapTopCardStateInitilalizer(card)),
    gameLevel: dto.gameLevel,
    timeToObserveBeforeStart: dto.timeToObserveBeforeStart,
    cardToFindQuantity: dto.cardToFindQuantity,
    maxErrorQuantity: dto.maxErrorQuantity,
    isGameFinish: INITIAL_IS_GAME_FINISH,
    isGameWin: INITIAL_IS_GAME_WIN
  };
  return cardGameState;
}

export function mapToGameTextInformationStateInitializer(textInformationDto: IGameTextInformationDto): IGameTextInformationState {
  return {
    congratulationWords: textInformationDto.congratulationWords,
    loosingWords: textInformationDto.loosingWords,
    gameLostText: textInformationDto.gameLostText,
    gameVictoryText: textInformationDto.gameVictoryText,
    presentationText: textInformationDto.presentationText,
    textVisibility: {
      isInstructionVisible: INITIAL_PRESENTATION_TEXT_VISIBILITY,
      isEndGameInstructionVisible: INITIAL_PRESENTATION_END_TEXT_VISIBILITY
    }
  }
}

export function mapTopCardStateInitilalizer(card: ICardDto): ICardState {
  return {
    id: card.id,
    isCardToFind: card.isCardToFind,
    cardPosition: card.cardPosition,
    cardImages: card.cardImages,
    isCardReturned: INITIAL_ARE_CARDS_IN_GAME_RETURN,
    isMarkToShow: INITIAL_IS_MARK_ON_CARDS_IN_GAME_VISIBLE
  };
}

export function mapTocardToFindInGameInitilalizer(cardToFind: ICardToFindDto): ICardToFindState {
  return {
    cardImages: cardToFind.card,
    isCardVisible: INITIAL_CARD_TO_FIND_VISIBILITY,
    cardTextExplanation: cardToFind.cardTextExplanation
  }
}
