import { ICardState, IMemoryCardGameState } from '../model';
import { ICardDto, ICardPositionDto, IMemoryCardGameDataDto } from '../../../models/memoryCardGame/memory-card-game-api.dto';

/**
 * Permets l'initialisation du state au démarrage du Memory Card Game
 * @param dto
 * @returns
 */
export function mapToMemoryCardGameStateInitiilalizer(dto: IMemoryCardGameDataDto): IMemoryCardGameState {
  return {
    gameTextInformation: dto.gameTextInformation,
    cardToFindInGame: dto.cardToFindInGame,
    numberOfCardColumn: dto.numberOfCardColumn,
    numberOfCardRow: dto.numberOfCardRow,
    cards: dto.cards.map(card => mapTopCardStateInitiilalizer(card)),
    gameLevel: dto.gameLevel,
    timeToObserveBeforeStart: dto.timeToObserveBeforeStart,
    cardToFindQuantity: dto.cardToFindQuantity,
    maxErrorQuantity: dto.maxErrorQuantity,
    isCardToFindVisible: false,
    gameTextVisibility: {
      isInstructionVisible: false,
      isEndGameInstructionVisible: false
    }
  };
}

export function mapTopCardStateInitiilalizer(card: ICardDto): ICardState {
  return {
    id: card.id,
    isCardToFind: card.isCardToFind,
    cardPosition: card.cardPosition,
    cardImages: card.cardImages,
    isCardReturned: false,
    isMarkToShow: false
  };
}
