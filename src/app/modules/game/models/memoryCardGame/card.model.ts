export class Card {
  constructor(
    public readonly id: number,
    public readonly cardPosition: CardPosition,
    public readonly cardImages: CardImage,
    public readonly isCardToFind: boolean,
    public isCardReturned: boolean,
    public isMarkToShow: boolean
  ) {}
}

/**
 * Position d'une carte dans le jeu
 */
export class CardPosition {
  constructor(
    public readonly positionX: number,
    public readonly positionY: number) {}
}

/**
 * Path Images
 */
export class CardImage {
  constructor(
    public readonly cardFrontImagePath: string,
    public readonly cardBackImagePath: string
  ) {}
}

