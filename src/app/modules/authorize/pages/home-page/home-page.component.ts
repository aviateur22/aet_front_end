import { Component } from '@angular/core';
import frontPage from '../../../../../misc/front-page';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
    memoryGameUrl: string = frontPage.gameSelection.url;
    mathGameUrl: string = frontPage.mathSelection.url;
}
