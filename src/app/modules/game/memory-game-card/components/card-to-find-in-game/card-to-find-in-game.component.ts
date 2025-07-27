import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import * as selectors from '../../../store/memoryCardGame/selector';
import { animate, style, transition, trigger } from '@angular/animations';
import { MemoryCardGameRules } from '../../../business/memory-card-game-rule';
import apiUrl from '../../../../../../misc/api.url';
import { Subject, takeUntil, tap } from 'rxjs';


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
export class CardToFindInGameComponent implements OnInit, OnDestroy{

  private _destroy$ = new Subject<void>();

  cardToFindInGame$ = this._store.pipe(select(selectors.cardToFindInGameSelector),
  tap(image => {
    this.frontImageNameUrl = apiUrl.streamImage.url.replace('{imageName}', image.cardImages.cardFrontImageName);
  }),
  takeUntil(this._destroy$)
  );

  isCardToFindInGameVisible$ = this._store.pipe(select(selectors.isCardToFindVisibleSelector));

  frontImageNameUrl: string = '';

  constructor(private _store: Store<IAppState>, private _gameRules: MemoryCardGameRules){}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {}

  hideCard(): void {
    this._gameRules.hideCardToFindInGame();
  }
}
