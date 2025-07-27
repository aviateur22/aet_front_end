import { createAction, props } from "@ngrx/store";
import { ICardGameDto } from "../../memory-game-card/models/memory-card-game-api.dto";

/**
 * Jeu Memory card
 */

// Téléchargement des données du jeux Memory card
export const generateNewGameAction = createAction('[get Generate Memory Card Game Action] get Generate Memory Card Game Action', props<{ playerId: string }>());
export const generateNewGameActionCompleteAction = createAction('[get Memory Card Game Complete Action] get Memory Card Game Complete Action', props<{ memoryCardGameData: ICardGameDto}>() );
export const getMemoryCardGameFailedAction = createAction('[ge tMemory Card Game Failed Action] get Memory Card Game Faile dAction');

export const displayFrontOfAllGameCardsAction = createAction('[display All Game Cards] display All Game Cards');
export const displayBackOfAllGameCardsAction = createAction('[hide All Game Cards] hide All Game Cards'); // déclenchement de l'action turnCardToBackInitialisationAction qui va retourner toutes les carte une par une
export const turnCardToBackInitialisationAction = createAction('[turn Card To Back Initialisation Action] turn Card To Back Initialisation Action', props<{cardId: number}>());
export const setGameIsReadyToPlayAction = createAction('[set Game Is Ready To Play Action] set Game Is Ready To Play Action');
export const countDownVisibilityAction = createAction('[count Down Visibility Action] count Down Visibility Action', props<{isVisible: boolean}>());

export const showCardToFindAction = createAction('[show Card To Find Action] show Card To Find Action');
export const hideCardToFindAction = createAction('[hide Card To Find Action] hide Card To Find Action');
export const finCardInGameAction = createAction('[get Selected Card Action] get Selected Card Action', props<{cardId: number}>());
export const showFrontOfCardClickedAction = createAction('[show Front Of Card Clicked Action] show Front Of Card Clicked Action', props<{cardId: number}>());
export const turnBackOfCardClickedAction = createAction('[turn Back Card In Game Action] turn Back Card In Game Action', props<{cardId: number}>());

export const countDownBeforeCardReturnAction = createAction('[count Down Before Card Return Action] count Down Before Card Return Action', props<{ timeToRemove: number }>());
export const updateBadResponseCumulatedAction = createAction('[update Bad Response Cumulated Action] update Bad Response Cumulated Action', props<{ badResponseQuantity: number }>());

export const setIsGameFinishAction = createAction('[set is Game Finish Action] set is Game Finish Action', props<{isGameFinish: boolean}>());
export const setIsGameWinAction = createAction('[set Is Game Win Action] set Is Game Win Action', props<{isGameWin: boolean}>());
export const resetGameAction = createAction('[reset Game Action] reset Game Action');

