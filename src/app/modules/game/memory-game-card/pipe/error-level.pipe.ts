import { Pipe, PipeTransform } from '@angular/core';
import { EndResultLevel } from '../../game-text/models/endResultLevel.model';

@Pipe({
  name: 'errorLevel'
})
export class ErrorLevelPipe implements PipeTransform {

  transform(endErrorLevel: EndResultLevel): string {

    switch(endErrorLevel) {
      case EndResultLevel.EXCELLENT: return 'color__good';
      case EndResultLevel.VERY_GOOD: return 'color__good';
      case EndResultLevel.GOOD: return 'color__good';
      case EndResultLevel.MEDUIM: return 'color__meduim'
      case EndResultLevel.BAD: return 'color__bad'
      case EndResultLevel.VERY_BAD: return 'color__bad'
      case EndResultLevel.LOOSE: return 'color__bad';
      default: return 'color__bad';
    }
  }

}
