import { environment } from "../environment/environment";

export default {
  generateNewMemoryCardGame: {
    url: `${environment.api_base}/games/card-game/level/{gameLevel}/generate-random-memory-card-game`
  },
  streamImage: {
    url : `${environment.api_base}/images/{imageName}`
  },
  generateNewMentalMathematicGame: {
    url: `${environment.api_base}/games/mental-calcul-game/level/{gameLevel}/generate-mental-calcul-game`
  }
}
