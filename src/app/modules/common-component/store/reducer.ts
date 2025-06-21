import { createReducer, on } from "@ngrx/store";
import { ICommonState } from "./state";
import * as commonAction from "./action";

export const initialCommonState: ICommonState = {
  message: null
}

export const commonReducers = createReducer(
  initialCommonState,
  on(commonAction.displayMessageAction, (state, {message})=>({...state, message }))
)
