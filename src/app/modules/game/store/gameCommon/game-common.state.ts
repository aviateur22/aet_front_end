/**
 * Commun a tous les jeux
 */
export interface IGameTextInformationState {
  gameTitle: string,
  presentationText: string,
  selectedEndTitle: string,
  selectedEndText:string,
  textVisibility: IGameTextVisibilityState;
  selectWord: string
}


export interface IGameTextVisibilityState {
  isInstructionVisible: boolean,
  isEndGameInstructionVisible: boolean,
  isWordingVisible: boolean
}
