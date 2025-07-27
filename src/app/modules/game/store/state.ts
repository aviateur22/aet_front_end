import { ActionReducerMap } from "@ngrx/store";
import { memoryCardReducers } from "./memoryCardGame/reducer";
import { gameTextReducers } from "./gameText/reducer";
import { IMemoryColorState , memoryColorReducers} from "./memoryColorGame/reducer";
import { IMemoryCardState } from "./memoryCardGame/state";
import { IGameTextState } from "./gameText/state";
import { IMentalMathDataState } from "./mentalMathematic/state";
import { mentalMathReducers } from "./mentalMathematic/reducer";
import { IGameSelectedState } from "./gameSelected/state";
import { gameSelectedReducer } from "./gameSelected/reducer";

export interface IGameSate {
  selectedGame: IGameSelectedState,
  gameTextState: IGameTextState,
  memoryCardState: IMemoryCardState,
  memoryColorState: IMemoryColorState,
  mentalMathState: IMentalMathDataState
}

export const gameReducers: ActionReducerMap<IGameSate> = {
  gameTextState: gameTextReducers,
  memoryCardState: memoryCardReducers,
  memoryColorState: memoryColorReducers,
  mentalMathState: mentalMathReducers,
  selectedGame: gameSelectedReducer
}
