import { Injectable } from "@angular/core";
import { delay, Observable } from "rxjs";
import { ICardGameDto } from "../modules/game/memory-game-card/models/memory-card-game-api.dto";
import { HttpClient } from "@angular/common/http";
import { IMentalMathDataDto } from "../modules/game/mental-mathematic/models/mental-math.dto";

@Injectable({
  providedIn: 'root'
})
export class ApiFakeData {
  constructor(private _http: HttpClient) { }

  getMemoryCardGameData(): Observable<ICardGameDto> {
    return this._http
      .get<ICardGameDto>('data/mock-memory-card.json')
      .pipe(delay(2000));
  }

    getMentalMathematicGameData(): Observable<IMentalMathDataDto> {
    return this._http
      .get<IMentalMathDataDto>('data/mock-math-card.json')
      .pipe(delay(2000));
  }
}
