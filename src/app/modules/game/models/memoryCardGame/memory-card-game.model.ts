import { GameTextInformation } from "../commonModel/game-text-information.model";
import { CardToFind } from "./card-to-find.model";
import { Card } from "./card.model";

export class CardGame {
  private _activeCard: Card | null = null;

  get activeCard(): Card | null {
    return this._activeCard;
  }

  setActiveCard(card: Card | null) {
    this._activeCard = card;
  }
  constructor(
    public readonly gameInformation: GameTextInformation,
    public readonly cardToFindInGame: CardToFind,
    public readonly numberOfCardColumn: number,
    public readonly numberOfCardRow: number,
    public readonly cards: Card [],
    public readonly gameLevel: string,
    public readonly timeToObserveBeforeStart: number,
    public readonly cardToFindQuantity: number,
    public readonly maxErrorQuantity: number) {}

    /**
     * - Affichage de toute les cartes pendant X secondes pour observation
     * - Affichage de la carte à trouver
     */
    startGame(): void {

    }

}
