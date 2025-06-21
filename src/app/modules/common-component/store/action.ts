import { createAction, props } from "@ngrx/store";
import { IFlashMessageState } from "./model";

export const displayMessageAction = createAction('[Share display message] display message', props<{message: IFlashMessageState}>())
