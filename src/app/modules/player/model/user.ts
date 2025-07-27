export interface IResponsiblePlayer extends IPlayer{
  email: string,
  role: string,
  jwt: string
  familyPlayers: IPlayer[]
}

export interface IPlayer {
  playerId: string,
  name: string
}
