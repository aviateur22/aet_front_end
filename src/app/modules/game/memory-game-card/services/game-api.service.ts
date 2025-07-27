import { Injectable } from '@angular/core';
import {  Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICardGameDto } from '../models/memory-card-game-api.dto';
import apiUrl from '../../../../../misc/api.url';
import { ApiFakeData } from '../../../../apiFakeData/api-fake.service';
import { environment } from '../../../../../environment/environment';
import { GameLevel } from '../models/game-level.model';
import { GameTextInformationService } from '../../game-text/services/game-text-information.service';
@Injectable({
  providedIn: 'root'
})
export class GameApiService {

constructor(
  private _http: HttpClient,
  private _apiFakeData: ApiFakeData,
  private _gameTextInformationService: GameTextInformationService) { }

  getMemoryCardGameData(playerId: string, gameLevel: GameLevel): Observable<ICardGameDto> {
    if(environment.isFakeData) {
      let data = this._apiFakeData.getMemoryCardGameData().pipe(
        tap(data=> this._gameTextInformationService.setGameTextInformation(data.gameTextInformation))
      );
      return data;
    }

    const url = apiUrl.generateNewMemoryCardGame.url.replace('{gameLevel}', 'difficult');

    return this._http.get<ICardGameDto>(url).pipe(
      tap(data=> this._gameTextInformationService.setGameTextInformation(data.gameTextInformation))
    );
  }
}
