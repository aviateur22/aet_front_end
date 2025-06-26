/**
 * Commun a tous les jeux
 */
export interface IGameTextInformationState {
  congratulationWords: string[],
  loosingWords: string[],
  gameLostText: string,
  gameVictoryText:string,
  presentationText: string,
  textVisibility: gameTextVisibilityState
}


export interface gameTextVisibilityState {
  isInstructionVisible: boolean,
  isEndGameInstructionVisible: boolean
}

