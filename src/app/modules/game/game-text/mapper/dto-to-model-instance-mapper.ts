import { EndResultLevel } from "../models/endResultLevel.model";
import { IGameEndParameterByLevelDto } from "../models/game-text-information.dto";
import { GameEndParameterWithErrorLevel } from "../models/game-text-information.model";

export function mapGameEndParameterByLevelDtoToInstance(dto: IGameEndParameterByLevelDto): GameEndParameterWithErrorLevel {
  return new GameEndParameterWithErrorLevel(
    dto.minError,
    dto.maxError,
    mapDtoToEndResultLevel(dto.endResultLevel),
    dto.endGameText.endTitle,
    dto.endGameText.endText
  )
}

export function mapDtoToEndResultLevel(dto: string): EndResultLevel {
  switch(dto) {
    case 'EXCELLENT': return EndResultLevel.EXCELLENT;
    case 'VERY_GOOD': return EndResultLevel.VERY_GOOD;
    case 'GOOD': return EndResultLevel.GOOD;
    case 'MEDUIM': return EndResultLevel.MEDUIM;
    case 'BAD': return EndResultLevel.BAD
    case 'VERY_BAD': return EndResultLevel.VERY_BAD;
    case 'LOOSE': return EndResultLevel.LOOSE;
    default: return EndResultLevel.LOOSE;
  }
}
