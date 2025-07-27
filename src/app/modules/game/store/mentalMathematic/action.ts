import { createAction, props } from "@ngrx/store";
import { GameLevel } from "../../mental-mathematic/models/mental-math.model";
import { IMentalMathDataDto } from "../../mental-mathematic/models/mental-math.dto";


export const resetMentalMathematicGameAction = createAction('[reset Mental Mathematic Game Action] reset Mental Mathematic Game Action');
export const loadNewMentalMathematicGameAction = createAction('[load New Mental Mathematic Game Action] load New Mental Mathematic Game Action', props<{ gameLevel: GameLevel }>());
export const loadNewMentalMathematicGameCompleteAction = createAction('[load New Mental Mathematic Game Complete Action] load New Mental Mathematic Game CompleteAction', props<{ mentalMathData: IMentalMathDataDto }>());
export const loadNewMentalMathematicGameFailedAction = createAction('[load New Mental Mathematic Game Failed Action] load New Mental Mathematic Game Failed Action');

export const nextOperationIdAction = createAction('[next Operation Action] next Operation Action', props<{ operationId: number }>());
export const isActiveOperationVisibleAction = createAction('[is Active Operation Visible Action] is Active Operation Visible Action', props<{ isVisible: boolean }>());
export const decountRemainingTimeAction = createAction('[decount Remaining Time Action] decount Remaining Time Action', props<{ remainingTime: number, operationId: number }>());
export const incrementBadResponseAction = createAction('[increment Bad Response Action] increment Bad Response Action', props<{ badResponseCumultated: number }>());

export const selectProposalResponse = createAction('[select Proposal Response] select Proposal Response', props<{ proposalResponseId: number, operationId: number }>());
