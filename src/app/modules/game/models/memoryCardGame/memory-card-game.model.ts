import { GameTextInformation } from "../commonModel/game-text-information.model";
import { CardToFind } from "./card-to-find.model";
import { Card } from "./card.model";

export class CardGame {

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

}
