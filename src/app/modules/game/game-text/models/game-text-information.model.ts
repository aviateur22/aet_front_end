import { EndResultLevel } from "./endResultLevel.model";

/**
 * Données commun à tous les jeux
 */
export class GameTextInformation {
  constructor(
    public readonly selectedEndTitle: string,
    public readonly selectedEndText: string,
    public readonly textInformationVisibility: TextInformationVisibility,
    public readonly GameEndParameterWithErrorLevels: GameEndParameterWithErrorLevel[]
  ) {}
}

export class TextInformationVisibility {
  constructor(
    public readonly isInstructionVisible: boolean,
    public readonly isEndGameInstructionVisible: boolean
  ){}
}

export class GameEndParameterWithErrorLevel {
  constructor(
    public readonly minError: number,
    public readonly maxError: number,
    public readonly endResultLevel: EndResultLevel,
    public readonly endGameTitle: string,
    public readonly endGameText: string
  ){}
}

