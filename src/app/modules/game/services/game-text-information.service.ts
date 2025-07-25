import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IGameTextInformationDto } from '../models/commonModel/game-text-information.dto';

/**
 * Service permettant de stocker les données textuelles d'un jeu
 */
@Injectable({
  providedIn: 'root'
})
export class GameTextInformationService {

  private gameTextInformationState$ = new BehaviorSubject<IGameTextInformationDto | null>(null);

  constructor() { }

  getGameTextInformation(): Observable<IGameTextInformationDto | null> {
    return this.gameTextInformationState$.asObservable();
  }

  setGameTextInformation(data: IGameTextInformationDto): void {
    this.gameTextInformationState$.next(data);
  }

}
