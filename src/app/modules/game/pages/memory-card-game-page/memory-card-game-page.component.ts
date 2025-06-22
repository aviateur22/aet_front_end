import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';


import * as cardGameAction from '../../store/memoryCardGame/action';

@Component({
  selector: 'app-memory-card-game-page',
  templateUrl: './memory-card-game-page.component.html',
  styleUrl: './memory-card-game-page.component.css'
})
export class MemoryCardGamePageComponent implements OnInit {


  constructor(
    private _store: Store<IAppState>
  ){}

  ngOnInit(): void {
    this._store.dispatch(cardGameAction.getMemoryCardGameAction({playerId: '1'}));
  }



}
