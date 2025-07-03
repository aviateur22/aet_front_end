import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import * as selectors from '../../../store/memoryCardGame/selector';


@Component({
  selector: 'app-card-to-find-in-game',
  templateUrl: './card-to-find-in-game.component.html',
  styleUrl: './card-to-find-in-game.component.css'
})
export class CardToFindInGameComponent {

  cardToFindInGame$ = this._store.pipe(select(selectors.cardToFindInGameSelector));

  constructor(private _store: Store<IAppState>){}

}
