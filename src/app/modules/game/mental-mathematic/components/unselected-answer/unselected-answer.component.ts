import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from '../../../../../store/state';
import * as mentalMathSelector from "../../../store/mentalMathematic/selector";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-unselected-answer',
  templateUrl: './unselected-answer.component.html',
  styleUrl: './unselected-answer.component.css',
  animations: [
    trigger('fadeInOut', [
      // When element enters the DOM
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      // When element leaves the DOM
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class UnselectedAnswerComponent {
    isUnselectedAnswerVisible$: Observable<boolean> = this._store.pipe(select(mentalMathSelector.isUnselectedAnswerVisibleSelector));

    constructor(private _store: Store<IAppState>){}

}
