import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { GameApiService } from "../../services/game-api.service";

@Injectable()
export class MemoryColorEffect {
  constructor(private _action$: Actions ,private gameService: GameApiService) {}
}
