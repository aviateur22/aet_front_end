import { Component } from '@angular/core';
import frontPage from '../../../../../misc/front-page';

@Component({
  selector: 'app-game-selection-page',
  templateUrl: './game-selection-page.component.html',
  styleUrl: './game-selection-page.component.css'
})
export class GameSelectionPageComponent {
  memoryCardGameUrl: string = frontPage.memoryCardGame.url;
  memoryColorGameUrl: string = frontPage.memoryColorGame.url;


}
