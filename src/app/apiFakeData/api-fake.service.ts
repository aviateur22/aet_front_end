import { Injectable } from "@angular/core";
import { delay, Observable } from "rxjs";
import { IMemoryCardGameDataDto } from "../modules/game/models/memoryCardGame/memory-card-game-api.dto";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiFakeData {
  constructor(private _http: HttpClient) { }

  getMemoryCardGameData(): Observable<IMemoryCardGameDataDto> {
    return this._http
      .get<IMemoryCardGameDataDto>('data/mock-memory-card.json')
      .pipe(delay(2000));
  }
}
