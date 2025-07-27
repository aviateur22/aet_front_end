import { Route } from "@angular/router";
import frontPage from "../../../../misc/front-page";
import { GameSelectionPageComponent } from "../pages/game-selection-page/game-selection-page.component";
import { MemoryCardGamePageComponent } from "../pages/memory-card-game-page/memory-card-game-page.component";
import { MathSelectionPageComponent } from "../pages/math-selection-page/math-selection-page.component";
import { MentalMathematicPageComponent } from "../pages/mental-mathematic-page/mental-mathematic-page.component";

export const gameRouting: Route[] = [
  { path: frontPage.gameSelection.url, component: GameSelectionPageComponent, title: frontPage.gameSelection.title },
  { path: frontPage.mathSelection.url, component: MathSelectionPageComponent, title: frontPage.mathSelection.title},
  { path: frontPage.memoryCardGame.url, component: MemoryCardGamePageComponent, title: frontPage.gameSelection.title},
  { path: frontPage.mentalMathemtic.url, component: MentalMathematicPageComponent, title: frontPage.mentalMathemtic.title}
]
