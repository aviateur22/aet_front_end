import { ICardState, ICardToFindState, IMemoryCardGameState } from '../model';
import { ICardDto, ICardImageDto, ICardPositionDto, IMemoryCardGameDataDto } from '../../../models/memoryCardGame/memory-card-game-api.dto';

/**
 * Permets l'initialisation du state au démarrage du Memory Card Game
 * @param dto
 * @returns
 */
export function mapToMemoryCardGameStateInitilalizer(dto: IMemoryCardGameDataDto): IMemoryCardGameState {
  const memoryCardGameState: IMemoryCardGameState = {
    gameTextInformation: dto.gameTextInformation,
    cardToFindInGame: mapTocardToFindInGameInitilalizer(dto.cardToFindInGame),
    numberOfCardColumn: dto.numberOfCardColumn,
    numberOfCardRow: dto.numberOfCardRow,
    cards: dto.cards.map(card => mapTopCardStateInitilalizer(card)),
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

  console.log(memoryCardGameState);
  return memoryCardGameState;
}

export function mapTopCardStateInitilalizer(card: ICardDto): ICardState {
  return {
    id: card.id,
    isCardToFind: card.isCardToFind,
    cardPosition: card.cardPosition,
    cardImages: card.cardImages,
    isCardReturned: false,
    isMarkToShow: false
  };
}

export function mapTocardToFindInGameInitilalizer(cardToFin: ICardImageDto): ICardToFindState {
  return {
    cardImages: cardToFin,
    isCardVisible: false
  }
}
