/**
 * Commun a tous les jeux
 */
export interface IGameTextInformationState {
  congratulationWords: string[],
  loosingWords: string[],
  gameLostText: string,
  gameVictoryText:string,
  presentationText: string,
  textVisibility: IGameTextVisibilityState;
  gameTitle: string,
  selectWord: string,
  badResponseCumultated: number
}


export interface IGameTextVisibilityState {
  isInstructionVisible: boolean,
  isEndGameInstructionVisible: boolean,
  isWordingVisible: boolean
}
