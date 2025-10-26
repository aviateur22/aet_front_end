import { createAction, props } from "@ngrx/store";

export const setTextIntroductionAction = createAction('[set Text Introduction Action] set Text Introduction Action', props<{ gameTitle: string, presentationText : string }>());
export const setEndTextAction = createAction('[set End Text Action] set End Text Action', props<{ endTitle: string, endText : string, endErrorLevel: string }>());
export const showPresentationTextAction = createAction('[show Presentation Text Action] show Presentation Text Action');
export const hidePresentationTextAction = createAction('[hide Presentation Text Action] hide Presentation Text Action');
export const updateWordToDisplayAction = createAction('[update Word To Display Action] update Word To Display Action', props<{ wordToDisplay: string }>());
export const updateWordVisibilityAction = createAction('[update Word Visibility Action] update Word Visibility Action', props<{ isVisible: boolean }>());
export const showEndTextAction = createAction('[show End Text Action] show End Text Action');
export const hideEndTextAction = createAction('[Hide End Text Action] Hide End Text Action');
export const resetGameText = createAction('[reset Game Text] reset Game Text');
