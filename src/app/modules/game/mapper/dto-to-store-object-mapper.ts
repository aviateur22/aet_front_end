import { IGameTextInformationDto } from "../models/commonModel/game-text-information.dto";
import { ICardGameDto, ICardDto, ICardImageDto, ICardToFindDto } from "../models/memoryCardGame/memory-card-game-api.dto";
import { IGameTextInformationState } from "../store/gameCommon/game-common.state";
import { INITIAL_ARE_CARDS_IN_GAME_RETURN, INITIAL_BAD_RESPONSE_CUMULATED, INITIAL_CARD_TO_FIND_VISIBILITY, INITIAL_IS_COUNT_DOWN_VISIBLE, INITIAL_IS_GAME_FINISH, INITIAL_IS_GAME_WIN, INITIAL_IS_MARK_ON_CARDS_IN_GAME_VISIBLE, INITIAL_PRESENTATION_END_TEXT_VISIBILITY, INITIAL_PRESENTATION_TEXT_VISIBILITY, INITIAL_WORDING_VISIBILITY } from "../store/memoryCardGame/initial-state-value";
import { ICardGameState, ICardImageState, ICardState, ICardToFindState } from "../store/memoryCardGame/state";

/**
 * Permets l'initialisation du state au démarrage du Memory Card Game
 * @param dto
 * @returns
 */
export function mapToMemoryCardGameStateInitilalizer(dto: ICardGameDto): ICardGameState {
  const cardGameState: ICardGameState = {
    gameTextInformation: mapToGameTextInformationStateInitializer(dto.gameTextInformation),
    cardToFindInGame: mapTocardToFindInGameInitilalizer(dto.cardToFindInGame),
    cards: dto.cards.map(card => mapTopCardStateInitilalizer(card)),
    gameLevel: dto.gameLevel,
    cardToFindQuantity: dto.cardToFindQuantity,
    maxErrorQuantity: dto.maxErrorQuantity,
    isGameFinish: INITIAL_IS_GAME_FINISH,
    isGameWin: INITIAL_IS_GAME_WIN,
    badResponseCumultated: INITIAL_BAD_RESPONSE_CUMULATED,
    timeCountDown: {
      timeToObserveBeforeStart: dto.timeToObserveBeforeStart,
      isCountDownVisible: INITIAL_IS_COUNT_DOWN_VISIBLE
    }
  };
  return cardGameState;
}

export function mapToGameTextInformationStateInitializer(textInformationDto: IGameTextInformationDto): IGameTextInformationState {
  console.log(textInformationDto.gamePresentation.gameTitle)
  return {
  presentationText: textInformationDto.gamePresentation.presentationText,
  gameTitle: textInformationDto.gamePresentation.gameTitle,
  selectWord: "",
  selectedEndTitle: "",
  selectedEndText: "",
  textVisibility: {
    isInstructionVisible: INITIAL_PRESENTATION_TEXT_VISIBILITY,
    isEndGameInstructionVisible: INITIAL_PRESENTATION_END_TEXT_VISIBILITY,
    isWordingVisible: INITIAL_WORDING_VISIBILITY
  },
}
}

export function mapTopCardStateInitilalizer(card: ICardDto): ICardState {
  return {
    id: card.id,
    isCardToFind: card.isCardToFind,
    cardImages: mapToCardImage(card.cardImage),
    isCardReturned: INITIAL_ARE_CARDS_IN_GAME_RETURN,
    isMarkToShow: INITIAL_IS_MARK_ON_CARDS_IN_GAME_VISIBLE
  };
}

export function mapTocardToFindInGameInitilalizer(cardToFind: ICardToFindDto): ICardToFindState {
  return {
    cardImages: mapToCardImage(cardToFind.cardImage),
    isCardVisible: INITIAL_CARD_TO_FIND_VISIBILITY,
    cardTextExplanation: cardToFind.cardTextExplanation
  }
}

export function mapToCardImage(cardImage: ICardImageDto): ICardImageState {
  return {
    cardFrontImageName: cardImage.cardFrontImageName,
    cardBackImageName: cardImage.cardBackImageName
  }
}
