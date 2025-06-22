import { GameTextInformation } from "../game.model";
import { CardToFind } from "./card-to-find.model";
import { Card } from "./card.model";

export class MemoryCardGame {
    private _isInstructionVisible: boolean = false;
    private _isEndGameInstructionVisible: boolean = false;
    private _isCardToFindVisible: boolean = false;
    private _activeCard: Card | null = null;


  // Getters
  get isInstructionVisible(): boolean {
    return this._isInstructionVisible;
  }

  get isEndGameInstructionVisible(): boolean {
    return this._isEndGameInstructionVisible;
  }

  get isCardToFindVisible(): boolean {
    return this._isCardToFindVisible;
  }

  get activeCard(): Card | null {
    return this._activeCard;
  }

  // Setters or control methods
  showInstructions() {
    this._isInstructionVisible = true;
  }

  hideInstructions() {
    this._isInstructionVisible = false;
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
