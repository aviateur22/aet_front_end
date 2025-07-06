import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import * as selectors from '../../../store/memoryCardGame/selector';
import { animate, style, transition, trigger } from '@angular/animations';
import { MemoryCardGameRules } from '../../../core/memory-card-game-rule';


@Component({
  selector: 'app-card-to-find-in-game',
  templateUrl: './card-to-find-in-game.component.html',
  styleUrl: './card-to-find-in-game.component.css',
  animations: [
    trigger('slideFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('1000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class CardToFindInGameComponent {

  cardToFindInGame$ = this._store.pipe(select(selectors.cardToFindInGameSelector));
  isCardToFindInGameVisible$ = this._store.pipe(select(selectors.isCardToFindVisibleSelector));

  constructor(private _store: Store<IAppState>, private _gameRules: MemoryCardGameRules){}

  hideCard(): void {
    this._gameRules.hideCardToFindInGame();
  }
}
