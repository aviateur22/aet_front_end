import { CardImage } from "./card.model";

/**
 * Carte a trouvé dans le jeu
 */
export class CardToFind {
  constructor(
      public readonly cardImages: CardImage,
      public isCardVisible: boolean,
    ) {}
}
