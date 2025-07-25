/**
 * Text à afficher pour le déroulement d'un jeu
 */
export interface IGameTextInformationDto extends IWiningOrLosingWordsDto {
  gamePresentation: IGamePresentation,
  gameEndParameterByLevels: IGameEndParameterByLevelDto[]
}

/**
 * Mot pour les coup gagnant ou perdant
 */
interface IWiningOrLosingWordsDto {
  congratulationWords: string[],
  loosingWords: string[]
}

/**
 * Text présentation DTO
 */
interface IGamePresentation {
  gameTitle: string,
  presentationText : string
}

/**
 * Text de victoire ou perdu DTO
 */
export interface IGameEndParameterByLevelDto {
  minError: number,
  maxError: number,
  endResultLevel: string
  endGameText: IEndGameTextDto
}

interface IEndGameTextDto {
  endTitle: string,
  endText: string
}

