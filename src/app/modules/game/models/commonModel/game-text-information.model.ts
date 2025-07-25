/**
 * Données commun à tous les jeux
 */
export class GameTextInformation {
  constructor(
    public readonly selectedEndTitle: string,
    public readonly selectedEndText: string,
    public readonly textInformationVisibility: TextInformationVisibility
  ) {}
}

export class TextInformationVisibility {
  constructor(
    public readonly isInstructionVisible: boolean,
    public readonly isEndGameInstructionVisible: boolean
  ){}
}
