/**
 * Données commun à tous les jeux
 */
export class GameTextInformation {
  constructor(
    public readonly congratulationWords: string[],
    public readonly loosingWords: string[],
    public readonly gameLostText: string,
    public readonly gameVictoryText:string,
    public readonly gamePresentationText: string
  ) {}
}
