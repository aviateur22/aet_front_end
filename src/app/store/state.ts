import { ActionReducerMap, combineReducers } from "@ngrx/store";
import { gameReducers } from "../modules/game/store/state";
import { IGameSate } from "../modules/game/store/state";
import { ICommonState } from "../modules/common-component/store/state";
import { commonReducers } from "../modules/common-component/store/reducer";

export interface IAppState {
  gameState: IGameSate,
  commonState: ICommonState
}

export const reducers: ActionReducerMap<IAppState> = {
  gameState: combineReducers(gameReducers),
  commonState: commonReducers
}
