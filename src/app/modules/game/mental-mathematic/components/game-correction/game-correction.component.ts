import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAppState } from '../../../../../store/state';
import { select, Store } from '@ngrx/store';
import * as mentalGameSelector from '../../../store/mentalMathematic/selector';
import * as gameTextAction from '../../../store/gameText/action';
import * as mentalGameAction from '../../../store/mentalMathematic/action';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-game-correction',
  templateUrl: './game-correction.component.html',
  styleUrl: './game-correction.component.css'
})
export class GameCorrectionComponent implements OnInit, OnDestroy {
  private _destroyed = new Subject<void>();
  isCorrectionToshow$ = this._store.pipe(select(mentalGameSelector.isCorrectionToShowSelector)).pipe(takeUntil(this._destroyed));
  operation$ = this._store.pipe(select(mentalGameSelector.mentalCardListSelector)).pipe(takeUntil(this._destroyed));

  constructor(private _store: Store<IAppState>) {}

  ngOnInit(): void {}

  close() {
    this._store.dispatch(gameTextAction.showEndTextAction());
    this._store.dispatch(mentalGameAction.isCorrectionToShowAction({ isVisible: false}));
  }

  ngOnDestroy(): void {
   this._destroyed.next();
   this._destroyed.complete();
  }

}
