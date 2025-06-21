import { ActionReducerMap } from "@ngrx/store";
import { IMemoryCardState, memoryCardReducers } from "./memoryCardGame/reducer";
import { IMemoryColorState , memoryColorReducers} from "./memoryColorGame/reducer";

export interface IGameSate {
  memoryCardState: IMemoryCardState,
  memoryColorState: IMemoryColorState
}

export const gameReducers: ActionReducerMap<IGameSate> = {
  memoryCardState: memoryCardReducers,
  memoryColorState: memoryColorReducers
}
