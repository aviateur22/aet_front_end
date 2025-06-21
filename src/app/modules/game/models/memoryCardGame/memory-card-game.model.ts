import { GameTextInformation } from "../game.model";
import { Card, CardImage } from "./card.model";

export class MemoryCardGame {

  constructor(
    public readonly gameInformation: GameTextInformation,
    public readonly cardToFindInGame: CardImage,
    public readonly numberOfCardColumn: number,
    public readonly numberOfCardRow: number,
    public readonly cards: Card [],
    public readonly gameLevel: string,
    public readonly timeToObserveBeforeStart: number,
    public readonly cardToFindQuantity: number,
    public readonly maxErrorQuantity: number,
    public isInstructionVisible: boolean = false,
    public isEndGameInstructionVisible: boolean = false,
    public isCardToFindVisible: boolean = false) {}
}
