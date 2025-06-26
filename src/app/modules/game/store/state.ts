import { ActionReducerMap } from "@ngrx/store";
import { memoryCardReducers } from "./memoryCardGame/reducer";
import { IMemoryColorState , memoryColorReducers} from "./memoryColorGame/reducer";
import { IMemoryCardState } from "./memoryCardGame/state";

export interface IGameSate {
  memoryCardState: IMemoryCardState,
  memoryColorState: IMemoryColorState
}

export const gameReducers: ActionReducerMap<IGameSate> = {
  memoryCardState: memoryCardReducers,
  memoryColorState: memoryColorReducers
}
