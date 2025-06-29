import { Injectable } from "@angular/core";
import { delay, Observable } from "rxjs";
import { ICardGameDto } from "../modules/game/models/memoryCardGame/memory-card-game-api.dto";
import { HttpClient } from "@angular/common/http";

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
}
