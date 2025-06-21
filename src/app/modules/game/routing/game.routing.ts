import { Route } from "@angular/router";
import frontPage from "../../../../misc/front-page";
import { GameSelectionPageComponent } from "../pages/game-selection-page/game-selection-page.component";
import { MemoryCardGamePageComponent } from "../pages/memory-card-game-page/memory-card-game-page.component";

export const gameRouting: Route[] = [
  { path: frontPage.gameSelection.url, component: GameSelectionPageComponent, title: frontPage.gameSelection.title },
  { path: frontPage.memoryCardGame.url, component: MemoryCardGamePageComponent, title: frontPage.gameSelection.title}
]
