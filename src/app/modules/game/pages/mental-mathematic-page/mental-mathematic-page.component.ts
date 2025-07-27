import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectGameAction } from '../../store/gameSelected/action'
import { IAppState } from '../../../../store/state';
import * as mentalMathematicSelector from '../../store/mentalMathematic/selector'
import { GameSelection } from '../../game-selected/models/game-selected.model';
import { MentalMathematicGameRule } from '../../business/mental-mathematic-game.rule';
import { GameLevel } from '../../mental-mathematic/models/mental-math.model';

@Component({
  selector: 'app-mental-mathematic-page',
  templateUrl: './mental-mathematic-page.component.html',
  styleUrl: './mental-mathematic-page.component.css'
})
export class MentalMathematicPageComponent implements OnInit {
    isGameLoading$: Observable<boolean> =this._store.pipe(select(mentalMathematicSelector.isGameLoadingSelector));
    isGameLoadingSuccess$: Observable<boolean> = this._store.pipe(select(mentalMathematicSelector.isLoadingSuccessSelector));
    isGameReadyToPlay$: Observable<boolean> = this._store.pipe(select(mentalMathematicSelector.isGameReadyToPlaySelector));

    constructor(private _store: Store<IAppState>, private _mentalMathematicRule: MentalMathematicGameRule) {}

  ngOnInit(): void {
    // Type de jeu selectionné
    this._store.dispatch(selectGameAction({gameSelected: GameSelection.MENTAL_MATHEMATIC_GAME }));
    this._mentalMathematicRule.loadGame(GameLevel.EASY);
    }

}
