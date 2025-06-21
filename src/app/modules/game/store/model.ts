/**
 * Commun a tous les jeux
 */
export interface IBaseGameState {
  gameTextInformation: {
    congratulationWords: string[],
    loosingWords: string[],
    gameLostText: string,
    gameVictoryText:string,
    presentationText: string
  },
  gameTextVisibility: {
    isInstructionVisible: false,
    isEndGameInstructionVisible: false
  }

}
