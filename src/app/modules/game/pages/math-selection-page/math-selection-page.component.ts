import { Component } from '@angular/core';
import frontPage from '../../../../../misc/front-page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-math-selection-page',
  templateUrl: './math-selection-page.component.html',
  styleUrl: './math-selection-page.component.css'
})
export class MathSelectionPageComponent {
    mentalMathematicUrl: string = frontPage.mentalMathemtic.url;
    mainPageGameUrl: string = frontPage.home.url;

    constructor(private _router: Router){}

    backToMenu() {
      this._router.navigate([this.mainPageGameUrl])
    }

}
