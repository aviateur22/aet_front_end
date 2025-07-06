import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import * as cardGameSelector from '../../../store/memoryCardGame/selector';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrl: './count-down.component.css',
  animations: [
        trigger('popAnimation', [
          transition('* => *', [
          style({ transform: 'scale(0.5)', opacity: 0 }),
          animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
        ])
      ]),
  ]

})
export class CountDownComponent {
  timeToObservBeforeStart$ = this._store.pipe(select(cardGameSelector.timeToObserveBeforeStartSelector));
  isTimeCountDownVisible$ = this._store.pipe(select(cardGameSelector.isTimeCountDownVisibleSelector));

  constructor(private _store: Store<IAppState>){}

}
