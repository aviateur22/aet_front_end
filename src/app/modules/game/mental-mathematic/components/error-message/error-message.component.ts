import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from '../../../../../store/state';
import * as mentalMathematicSelector from '../../../store/mentalMathematic/selector'

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {
  isGameLoadingSuccess$: Observable<boolean> = this._store.pipe(select(mentalMathematicSelector.isLoadingSuccessSelector));
  isGameReadyToPlay$: Observable<boolean> = this._store.pipe(select(mentalMathematicSelector.isGameReadyToPlaySelector));

  constructor(private _store: Store<IAppState>) {}
}
