import { createSelector } from "@ngrx/store";
import { IAppState } from "../../../../store/state";

export const selector = (state: IAppState) => state.gameState;


