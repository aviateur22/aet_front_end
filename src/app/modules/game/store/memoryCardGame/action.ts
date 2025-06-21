import { createAction, props } from "@ngrx/store";
import { MemoryCardGame } from "../../models/memoryCardGame/memory-card-game.model";
import { IMemoryCardGameDataDto } from "../../models/memoryCardGame/memory-card-game-api.dto";

/**
 * Jeu Memory card
 */

// Téléchargement des données du jeux Memory card
export const getMemoryCardGameAction = createAction('[Get Memory Card Game] Get Memory Card Game', props<{ playerId: string }>());
export const getMemoryCardGameCompleteAction = createAction('[get Memory Card Game Complete Action] get Memory Card Game Complete Action', props<{ memoryCardGameData: IMemoryCardGameDataDto}>() );
export const getMemoryCardGameFailedAction = createAction('[ge tMemory Card Game Failed Action] get Memory Card Game Faile dAction');

export const displayFrontOfAllGameCards = createAction('[display All Game Cards] display All Game Cards');
export const displayBackOfAllGameCards = createAction('[hide All Game Cards] hide All Game Cards');
export const displayCardToFind = createAction('[display Card To Find] display Card To Find');

export const showTheFrontOfSelectedCard = createAction('[show The Front Of Selected Card] show The Front Of Selected Card');
export const showTheBackOfSelectedCard = createAction('[show The Back Of Selected Card] show The Back Of Selected Card');
