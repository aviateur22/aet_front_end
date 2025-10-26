export enum GameLevel {
  EASY, MEDIUM, DIFFICULT
}

export class ActiveOperation {
  constructor(
    public readonly id: number,
    public timeToCalculate: number,
    public isOperationVisible: boolean,
    public readonly mentalCards: MentalCard[],
    public readonly mathOperations: string[],
    public readonly propsalResponses: ProposalResponse[],
    public readonly isUnselectedAnswerTextVisible: boolean,
    public readonly validOperationResponse: number,
    public readonly playerAnswer: number | undefined){}

}

export class MentalCard {
  constructor(
    public readonly id: number,
    public readonly number: number,
    public readonly cardBackImageName: string,
    public isCardReturned: boolean
  ) {}
}

export class ProposalResponse {
  constructor(
    public readonly id: number,
    public readonly proposalResponse: number,
    public isProposalSelected: boolean
  ) {}
}
