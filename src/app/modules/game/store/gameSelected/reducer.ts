import { createReducer, on } from "@ngrx/store";
import { IGameSelectedState } from "./state";
import { selectGameAction } from "./action"

export const initialGameSelectedState: IGameSelectedState = {
  gameSelected: null
}

export const gameSelectedReducer = createReducer(
  initialGameSelectedState,
  on(selectGameAction, (state, { gameSelected }) =>({
    ...state,
    gameSelected: gameSelected
  }))
)
