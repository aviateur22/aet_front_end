import { createAction, props } from "@ngrx/store";
import { CardGame } from "../../models/memoryCardGame/memory-card-game.model";
import { ICardGameDto } from "../../models/memoryCardGame/memory-card-game-api.dto";

/**
 * Jeu Memory card
 */

// Téléchargement des données du jeux Memory card
export const getMemoryCardGameAction = createAction('[Get Memory Card Game] Get Memory Card Game', props<{ playerId: string }>());
export const getMemoryCardGameCompleteAction = createAction('[get Memory Card Game Complete Action] get Memory Card Game Complete Action', props<{ memoryCardGameData: ICardGameDto}>() );
export const getMemoryCardGameFailedAction = createAction('[ge tMemory Card Game Failed Action] get Memory Card Game Faile dAction');

export const displayFrontOfAllGameCardsAction = createAction('[display All Game Cards] display All Game Cards');
export const displayBackOfAllGameCardsAction = createAction('[hide All Game Cards] hide All Game Cards'); // déclenchement de l'action turnCardToBackInitialisationAction qui va retourner toutes les carte une par une
export const turnCardToBackInitialisationAction = createAction('[turn Card To Back Initialisation Action] turn Card To Back Initialisation Action', props<{cardId: number}>());
export const setGameIsReadyToPlayAction = createAction('[set Game Is Ready To Play Action] set Game Is Ready To Play Action');

export const displayCardToFindAction = createAction('[display Card To Find] display Card To Find');

export const finCardInGameAction = createAction('[get Selected Card Action] get Selected Card Action', props<{cardId: number}>());
export const showFrontOfCardClickedAction = createAction('[show Front Of Card Clicked Action] show Front Of Card Clicked Action', props<{cardId: number}>());
export const turnBackOfCardClickedAction = createAction('[turn Back Card In Game Action] turn Back Card In Game Action', props<{cardId: number}>());

export const countDownBeforeCardReturnAction = createAction('[count Down Before Card Return Action] count Down Before Card Return Action', props<{ timeToRemove: number }>());

