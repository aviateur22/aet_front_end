import { environment } from "../environment/environment";

export default {
  getMemoryCardGame: {
    url: `${environment.api_base}/games/card-game/level/{gameLevel}/generate-random-memory-card-game`
  },
  streamImage: {
    url : `${environment.api_base}/images/{imageName}`
  }
}
