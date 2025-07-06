import { GameTextInformation } from "../commonModel/game-text-information.model";
import { CardToFind } from "./card-to-find.model";
import { Card } from "./card.model";
import { TimeCountDown } from "./time-count-down.model";

export class CardGame {

  constructor(
    public readonly gameInformation: GameTextInformation,
    public readonly cardToFindInGame: CardToFind,
    public readonly cards: Card [],
    public readonly gameLevel: string,
    public readonly timeCountDown: TimeCountDown,
    public readonly cardToFindQuantity: number,
    public readonly maxErrorQuantity: number,
    public readonly isGameFinish: boolean,
    public readonly isGameWin: boolean) {}

}
