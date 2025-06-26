import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMemoryCardGameDataDto } from '../models/memoryCardGame/memory-card-game-api.dto';
import apiUrl from '../../../../misc/api.url';
import { ApiFakeData } from '../../../apiFakeData/api-fake.service';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {

constructor(private _http: HttpClient, private _apiFakeData: ApiFakeData) { }

  getMemoryCardGameData(playerId: string): Observable<IMemoryCardGameDataDto> {
    if(environment.isFakeData) {
      let data = this._apiFakeData.getMemoryCardGameData();
      return data;
    }

    const url = apiUrl.getMemoryCardGame.url;
    return this._http.get<IMemoryCardGameDataDto>(url);
  }
}
