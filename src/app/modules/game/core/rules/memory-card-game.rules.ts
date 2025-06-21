import { Card } from "../../models/memoryCardGame/card.model";

export class MemoryCardGameRules {

  // Cartes de la partie
  private _cards: Card[] = [];
  private _numberOfCardColumn: number = 0;
  private _numberOfCardRow: number = 0;

  constructor({
    numberOfCardColumn,
    numberOfCardRow,
    cards } : {
    numberOfCardColumn: number,
    numberOfCardRow: number,
    cards: Card []
  }) {
    this._cards = cards;
    this._numberOfCardColumn = numberOfCardColumn;
    this._numberOfCardRow = numberOfCardRow;
  }

  showGameInstruction(): MemoryCardGameRules {

    return this;
  }

  displayAllCardsGame(): MemoryCardGameRules {
    for(let col = 0; col = this._numberOfCardColumn; col ++) {
      for(let row = 0; row = this._numberOfCardRow; row ++) {
        let activeCard: Card | undefined = this._cards.find(card => card.cardPosition.positionX === col &&  card.cardPosition.positionY === row);

        if(activeCard)
          activeCard.isCardReturned = true;
      }
    }

    return this;
  }

  hideAllCardsGame(): MemoryCardGameRules {
    for(let col = 0; col = this._numberOfCardColumn; col ++) {
      for(let row = 0; row = this._numberOfCardRow; row ++) {
        let activeCard: Card | undefined = this._cards.find(card => card.cardPosition.positionX === col &&  card.cardPosition.positionY === row);

        if(activeCard)
          activeCard.isCardReturned = false;
      }
    }

    return this;
  }

  playerReturnOneCard(card: Card) {
    card.cardReturn();
  }


}
