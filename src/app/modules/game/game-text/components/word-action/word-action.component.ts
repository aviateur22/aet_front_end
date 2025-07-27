import { Component, OnDestroy } from '@angular/core';
import * as selectors from '../../../store/gameText/selector';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import { Subject, takeUntil } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-word-action',
  templateUrl: './word-action.component.html',
  styleUrl: './word-action.component.css',
   animations: [
          trigger('popAnimation', [
            transition('* => *', [
            style({ transform: 'scale(0.5)', opacity: 0 }),
            animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
          ])
        ]),
    ]
})
export class WordActionComponent implements OnDestroy {

  private _destroy$ = new Subject<void>();


  isWordingVisible$ = this._store.pipe(select(selectors.isWordingVisibleSelector));
  selectWord$ = this._store.pipe(select(selectors.selectWordSelector));

  constructor(private _store: Store<IAppState>){}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}

