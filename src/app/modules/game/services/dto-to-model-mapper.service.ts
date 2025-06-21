import { Injectable } from '@angular/core';
import { Card, CardImage, CardPosition, MemoryCardGame } from '../models/memoryCardGame/card.model';
import { ICardDto, ICardImageDto, ICardPositionDto, IMemoryCardGameDataDto } from '../models/memoryCardGame/memory-card-game-api.dto';
import { GameTextInformation } from '../models/game.model';
import { IGameTextInformationDto } from '../models/game-api.dto';

@Injectable({
  providedIn: 'root'
})
export class DtoToModelMapperService {

  constructor() { }

  mapIMemoryCardGameDtoToModel(dto: IMemoryCardGameDataDto): MemoryCardGame {

    const gameTextPresentation: GameTextInformation = this.mapIGameTextInformationDtoToToModel(dto.game.gameTextInformation);
    const cardToFindInGame: CardImage = this.mapICardImageDtoToModel(dto.game.cardToFindInGame);
    const cards: Card [] = dto.game.gameCards.cards.map(card => this.mapICardDtoToModel(card));

    return new MemoryCardGame(
      gameTextPresentation,
      cardToFindInGame,
      {
        numberOfCardColumn: dto.game.gameCards.numberOfCardColumn,
        numberOfCardRow: dto.game.gameCards.numberOfCardRow,
        cards
      },
      dto.game.gameLevel,
      dto.game.timeToObserveBeforeStart,
      dto.game.cardToFindQuantity,
      dto.game.maxErrorQuantity
    )
  }

  private mapIGameTextInformationDtoToToModel(dto: IGameTextInformationDto): GameTextInformation {
    return new GameTextInformation(
      dto.congratulationWords,
      dto.loosingWords,
      dto.gameLostText,
      dto.gameVictoryText,
      dto.presentationText
    );
  }

  private mapICardImageDtoToModel(dto: ICardImageDto): CardImage {
    return new CardImage(
      dto.cardFrontImagePath,
      dto.cardBackImagePath
    );
  }

  private mapICardDtoToModel(dto: ICardDto): Card {
    const IS_CARD_RETURN: boolean = false;

    return new Card(
      dto.id,
      this.mapICardPositionDtoToModel(dto.cardPosition),
      dto.cardImages,
      dto.isCardToFind,
      IS_CARD_RETURN
    );
  }

  private mapICardPositionDtoToModel(dto: ICardPositionDto): CardPosition {
    return new CardPosition(
      dto.columnX,
      dto.columnY
    );
  }
}
