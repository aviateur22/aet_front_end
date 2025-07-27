import { Component } from '@angular/core';
import frontPage from '../../../../../misc/front-page';

@Component({
  selector: 'app-math-selection-page',
  templateUrl: './math-selection-page.component.html',
  styleUrl: './math-selection-page.component.css'
})
export class MathSelectionPageComponent {
    mentalMathematicUrl: string = frontPage.mentalMathemtic.url;

}
