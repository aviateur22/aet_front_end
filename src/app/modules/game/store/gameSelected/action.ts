import { createAction, props } from "@ngrx/store";
import { GameSelection } from "../../game-selected/models/game-selected.model";

export const selectGameAction = createAction('[select Game Action] select Game Action', props< { gameSelected: GameSelection } >());
