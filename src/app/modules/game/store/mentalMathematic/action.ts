import { createAction, props } from "@ngrx/store";
import { GameLevel } from "../../mental-mathematic/models/mental-math.model";
import { IMentalMathDataDto } from "../../mental-mathematic/models/mental-math.dto";
import { IPlayerAnswerState } from "./state";


export const resetMentalMathematicGameAction = createAction('[reset Mental Mathematic Game Action] reset Mental Mathematic Game Action');
export const loadNewMentalMathematicGameAction = createAction('[load New Mental Mathematic Game Action] load New Mental Mathematic Game Action', props<{ gameLevel: GameLevel }>());
export const loadNewMentalMathematicGameCompleteAction = createAction('[load New Mental Mathematic Game Complete Action] load New Mental Mathematic Game CompleteAction', props<{ mentalMathData: IMentalMathDataDto }>());
export const loadNewMentalMathematicGameFailedAction = createAction('[load New Mental Mathematic Game Failed Action] load New Mental Mathematic Game Failed Action');

export const isActiveOperationVisibleAction = createAction('[is Active Operation Visible Action] is Active Operation Visible Action', props<{ isVisible: boolean }>());

export const incrementBadResponseAction = createAction('[increment Bad Response Action] increment Bad Response Action');
export const registerStartTimeAction = createAction('[register Start Time Action] register Start Time Action', props<{ startTime: Date }>());
export const registerEndTimeAction = createAction('[register End Time Action] register End Time Action', props<{ endTime: Date }>());
export const prepareOperationTimer = createAction('[prepareOperationTimer] prepareOperationTimer');
export const startOperationTimer = createAction('[start Operation Timer] start Operation Timer');
export const tickOperationTimer = createAction('[tick Operation Timer] tick Operation Timer');
export const stopOperationTimer = createAction('[stop Operation Timer] stop Operation Timer');
export const manualyGoToNextOperationAction = createAction('[manualyGoToNextOperationAction] manualyGoToNextOperationAction');
export const updateRemainingTime = createAction('[update Remaining Time] update Remaining Time', props<{ remainingTime: number}>());
export const prepareNextOperationAcion = createAction('[prepareNextOperationAcion] prepareNextOperationAcion');
export const nextOperationAction = createAction('[next Operation Action] next Operation Action');
export const selectProposalResponseAction = createAction('[select Proposal Response] select Proposal Response', props<{ proposalResponseId: number }>());
export const registerPlayerAnswerAction = createAction('[register Player Answer Action] register Player Answer Action', props<{ playerResponse: IPlayerAnswerState }>());
export const getValidOperationResultAction = createAction('[ge tValid Operation Result Action] get Valid Operation Result Action', props<{ operationId: number }>());
export const loadEndGameTextAction = createAction('[loadEndGameTextAction] loadEndGameTextAction');
export const isNextOperationAvail = createAction('[loadEndGameTextAction] loadEndGameTextAction');
export const isUnselectedAnswerTextVisibleAction  = createAction('[is Unselected Answer Text Visible Action] is Unselected Answer Text Visible Action', props<{ isVisible: boolean }>());
export const isCorrectionToShowAction = createAction('[is Correction To Show Action] is Correction To Show Action', props<{ isVisible: boolean }>())
