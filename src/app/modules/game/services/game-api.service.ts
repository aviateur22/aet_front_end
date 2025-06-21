import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMemoryCardGameDataDto } from '../models/memoryCardGame/memory-card-game-api.dto';
import apiUrl from '../../../../misc/api.url';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {

constructor(private _http: HttpClient) { }

  getMemoryCardGameData(playerId: string): Observable<IMemoryCardGameDataDto> {

    const url = apiUrl.getMemoryCardGame.url;
    return this._http.get<IMemoryCardGameDataDto>(url);
  }
}
