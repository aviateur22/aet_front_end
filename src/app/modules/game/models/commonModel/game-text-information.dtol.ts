/**
 * Text à afficher pour le déroulement d'un jeu
 */
export interface IGameTextInformationDto extends IWiningOrLosingWordsDto, IIntroAndConclusionTextDto {
  gamePresentation: IGamePresentation
}

/**
 * Mot pour les coup gagnant ou perdant
 */
interface IWiningOrLosingWordsDto {
  congratulationWords: string[],
  loosingWords: string[]
}

/**
 * Text de victoire ou perdu DTO
 */
interface IIntroAndConclusionTextDto {
  gameLostText: string,
  gameVictoryText:string,
}

/**
 * Text présentation DTO
 */
interface IGamePresentation {
  gameTitle: string,
  presentationText : string
}

