export interface IMentalMathDataState {
  isGameReadyToPlay: boolean,
  isGameLoading: boolean,
  isLoadingSuccess: boolean,
  mentalMathGame: IMentalMathState
}

/**
 * Contenu du jeu
 */
export interface IMentalMathState {
  mentalMathStartTime: Date,
  mentalMathEndTime: Date,
  arePropoalResponseVisible: boolean,
  operations: IOperationState[],
  badResponseCumultated: number,
  isGameFinish: boolean,
  isGameWin: boolean,
  activeOperationIndex: number,
  isActiveOperationVisible: boolean
}

/**
 * Contenu pour un calcul
 */
export interface IOperationState {
  id: number,
  timeToCalculate: ITimeToCalculateState,
  mentalCards: IMentalCardState[],
  mathOperations: string[],
  proposalResponse: IPropsalResponseState[],
  playerResponse: IPlayerAnswerState,
  validOperationResponse: number,
  isUnselectedAnswerTextVisible: boolean
}

/**
 * Temps pour calculer
 */
export interface ITimeToCalculateState {
  unit: string,
  time: number
}

/**
 * Carte contenant la donnée visuelle
 */
export interface IMentalCardState {
  id: number,
  number: number,
  isCardReturn:  boolean,
  cardBackImageName: string,
}

/**
 * Réponse du joueur
 */
export interface IPlayerAnswerState {
  playerAnswer: number | undefined,
  isAnswerValid: boolean
}

/**
 * Réponse a choix multiple
 */
export interface IPropsalResponseState {
  id: number,
  proposalResponse: number,
  isProposalSelected: boolean
}

/**
 * Defilement des réponses du joueur
 * avec les corrections associées
 */
export interface IOperationCorrectionState {
  operationId: number,
  validOperationAnswer: number
}
