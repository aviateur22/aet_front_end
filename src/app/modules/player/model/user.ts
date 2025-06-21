export interface ResponsiblePlayer extends player{
  email: string,
  role: string,
  jwt: string
  players: player[]
}

export interface player {
  id: string,
  name: string
}
