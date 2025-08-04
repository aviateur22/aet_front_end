import { createReducer, on } from "@ngrx/store";
import { IGameTextState } from "./state";
import * as gameTextAction from './action';

export const initialIGameTextState: IGameTextState = {
  gameTitle: "",
  presentationText: "",
  selectedEndTitle: "",
  selectedEndText: "",
  textVisibility: {
    isInstructionVisible: false,
    isEndGameTextVisible: false,
    isWordingVisible: false
  },
  selectWord: "",
  endErrorLevel: ""
}

export const gameTextReducers = createReducer(
  initialIGameTextState,
  on(gameTextAction.resetGameText, () => initialIGameTextState),
  on(gameTextAction.setTextIntroductionAction, (state, { gameTitle, presentationText }) => ({
    ...state,
    gameTitle,
    presentationText
  })),
  on(gameTextAction.showPresentationTextAction,(state) => ({
    ...state, textVisibility: {
      ...state.textVisibility,
      isInstructionVisible: true
    }
  })),
  on(gameTextAction.hidePresentationTextAction,(state) => ({
     ...state, textVisibility: {
      ...state.textVisibility,
      isInstructionVisible: false
    }
  })),
on(gameTextAction.updateWordToDisplayAction, (state, { wordToDisplay }) => ({
  ...state, selectWord: wordToDisplay
})),
on(gameTextAction.updateWordVisibilityAction, (state, { isVisible }) => ({
  ...state, textVisibility: {
    ...state.textVisibility,
    isWordingVisible: isVisible
  }
})),
on(gameTextAction.setEndTextAction, (state, { endText, endTitle, endErrorLevel }) => ({
  ...state,
  selectedEndTitle: endTitle,
  selectedEndText: endText,
  endErrorLevel: endErrorLevel
})),
on(gameTextAction.showEndTextAction, (state) => ({
  ...state, textVisibility: {
    ...state.textVisibility,
    isEndGameTextVisible: true
  }
}))

)
