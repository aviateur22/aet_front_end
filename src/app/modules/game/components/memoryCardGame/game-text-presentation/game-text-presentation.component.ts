import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of, Subscription, take } from 'rxjs';
import { IAppState } from '../../../../../store/state';
import * as cardGameSelector from '../../../store/memoryCardGame/selector';
import { MemoryCardGameRules } from '../../../core/memory-card-game-rule';

@Component({
  selector: 'app-game-text-presentation',
  templateUrl: './game-text-presentation.component.html',
  styleUrl: './game-text-presentation.component.css'
})
export class GameTextPresentationComponent implements OnInit, OnDestroy {
  private _timeToObserve: number = 0;
  private _isLoadingSuccess: boolean = false;
  private _subscription = new Subscription();

  isPresentationTextVisible$ = this._store.pipe(select(cardGameSelector.isInstructionVisibleSelector));
  presentationText$ = this._store.pipe(select(cardGameSelector.presentationTextSelector));
  isGameLoadingSuccess$ = this._store.pipe(select(cardGameSelector.isLoadingSuccessSelector));

  constructor(private _store: Store<IAppState>, private _memoryCardGameRules: MemoryCardGameRules){}

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    const sub1 = this._store.pipe(select(cardGameSelector.isLoadingSuccessSelector)).subscribe(res=> this._isLoadingSuccess = res);
    const sub2 = this._store.pipe(select(cardGameSelector.timeToObserveBeforeStartSelector)).subscribe(res=> this._timeToObserve = res);

    this._subscription.add(sub1);
    this._subscription.add(sub2);
  }

  startGameCard(): void {

    console.log(this._timeToObserve);
    console.log(this._isLoadingSuccess);

    if( this._timeToObserve > 0 && this._isLoadingSuccess)
      this._memoryCardGameRules.intitializeGame(this._timeToObserve);

  }


}
