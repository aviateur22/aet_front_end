/**
 * Text à afficher pour le déroulement d'un jeu
 */
export interface IGameTextInformationDto extends IWiningOrLosingWordsDto, IIntroAndConclusionTextDto, IGamePresentationTextDto {

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
interface IGamePresentationTextDto {
  presentationText: string
}

