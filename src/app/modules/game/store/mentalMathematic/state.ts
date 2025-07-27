export interface IMentalMathDataState {
  isGameReadyToPlay: boolean,
  isGameLoading: boolean,
  isLoadingSuccess: boolean,
  mentalMathGame: IMentalMathState
}

export interface IMentalMathState {
  arePropoalResponseVisible: boolean,
  operations: IOperationState[],
  corrections: IOperationCorrectionState[],
  badResponseCumultated: number,
  isGameFinish: boolean,
  isGameWin: boolean,
  activeOperationId: number,
  isActiveOperationVisible: boolean,

}

export interface IOperationState {
  id: number,
  timeToCalculate: ITimeToCalculateState,
  mentalCards: IMentalCardState[],
  mathOperations: string[],
  proposalResponse: IPropsalResponseState[]
}

export interface ITimeToCalculateState {
  unit: string,
  time: number
}

export interface IMentalCardState {
  id: number,
  number: number,
  isCardReturn:  boolean,
  cardBackImageName: string,
}

export interface IPlayerAnswerState {
  operationId: number,
  playerAnswer: number,
  isAnswerValid: boolean
}

export interface IPropsalResponseState {
  id: number,
  proposalResponse: number,
  isProposalSelected: boolean
}

export interface IOperationCorrectionState {
  operationId: number,
  operationResult: number,
  playerAnswer: IPlayerAnswerState
}
