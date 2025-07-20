export class Card {
  constructor(
    public readonly id: number,
    public readonly cardImages: CardImage,
    public readonly isCardToFind: boolean,
    public isCardReturned: boolean,
    public isMarkToShow: boolean
  ) {}
}

/**
 * Path Images
 */
export class CardImage {
  constructor(
    public readonly cardFrontImageName: string,
    public readonly cardBackImageName: string
  ) {}
}

