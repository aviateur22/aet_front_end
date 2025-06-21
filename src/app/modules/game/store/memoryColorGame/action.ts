import { createAction, props } from "@ngrx/store";
import { IMemoryCardGameDataDto } from "../../models/memoryCardGame/memory-card-game-api.dto";

/**
 * Jeu Memory card
 */

// Téléchargement des données du jeux Memory card
export const getMemoryCardGameAction = createAction('[Get Memory Card Game] Get Memory Card Game', props<{ playerId: string }>());
export const getMemoryCardGameCompleteAction = createAction('[get Memory Card Game Complete Action] get Memory Card Game Complete Action', props<{ memoryCardGameData: IMemoryCardGameDataDto}>() );
export const getMemoryCardGameFailedAction = createAction('[ge tMemory Card Game Failed Action] get Memory Card Game Faile dAction');
