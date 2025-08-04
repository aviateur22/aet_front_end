import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiFakeData } from '../../../../apiFakeData/api-fake.service';
import { GameTextInformationService } from '../../game-text/services/game-text-information.service';
import { Observable, of, tap } from 'rxjs';
import { GameLevel } from '../models/mental-math.model';
import { environment } from '../../../../../environment/environment';
import { IMentalMathDataDto } from '../models/mental-math.dto';
import apiUrl from '../../../../../misc/api.url';
import { PlayerService } from '../../../player/service/player.service';

@Injectable({
  providedIn: 'root'
})
export class MentalMathematicApiService {

  constructor(
    private _http: HttpClient,
    private _apiFakeData: ApiFakeData,
    private _playerService: PlayerService,
    private _gameTextInformationService: GameTextInformationService) {}

  getMentalMathematicData(gameLevel: GameLevel): Observable<IMentalMathDataDto> {
    this._playerService.loadUserFromStorage();
    const player = this._playerService.getUser();


    if(player == null || player.playerId == null)
      throw new Error("Désolé vous n'étes pas reconnu");

    if(environment.isFakeData) {
      let data = this._apiFakeData.getMentalMathematicGameData().pipe(
        tap(data=> this._gameTextInformationService.setGameTextInformation(data.gameTextInformation))
      );
      return data;
    }

    const url = apiUrl.generateNewMentalMathematicGame.url.replace('{gameLevel}', 'easy').replace('{playerId}', player.playerId);

    return this._http.get<IMentalMathDataDto>(url).pipe(
      tap(data=> this._gameTextInformationService.setGameTextInformation(data.gameTextInformation))
    );
    }
}
