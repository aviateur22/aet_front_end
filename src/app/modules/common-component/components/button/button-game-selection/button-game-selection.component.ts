import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-game-selection',
  templateUrl: './button-game-selection.component.html',
  styleUrl: './button-game-selection.component.css'
})
export class ButtonGameSelectionComponent {

  @Input() buttonText: string = '';
  @Input() url: string = '';
  @Input() imageUrl = ''

  constructor(private _router: Router) {}

  navigateToUrl() {
    const trimmedUrl = this.url.trim();

    if(trimmedUrl)
   this._router.navigate([trimmedUrl]);
  }
}
