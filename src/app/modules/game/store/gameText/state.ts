/**
 * Commun a tous les jeux
 */
export interface IGameTextState {
  gameTitle: string,
  presentationText: string,
  selectedEndTitle: string,
  selectedEndText:string,
  endErrorLevel: string,
  textVisibility: IGameTextVisibilityState;
  selectWord: string
}


export interface IGameTextVisibilityState {
  isInstructionVisible: boolean,
  isEndGameTextVisible: boolean,
  isWordingVisible: boolean
}
