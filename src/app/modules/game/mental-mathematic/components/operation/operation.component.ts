import { Component, OnDestroy, OnInit } from '@angular/core';
import { MentalCard, ActiveOperation, ProposalResponse } from '../../models/mental-math.model';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import * as mentalMathSelector from "../../../store/mentalMathematic/selector";
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import { trigger, transition, style, animate } from '@angular/animations';
import { MentalMathematicGameRule } from '../../../business/mental-mathematic-game.rule';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.css',
  animations: [
    trigger('fadeScale', [
      transition(':enter', [ // when added to the DOM
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [ // when removed from the DOM
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0)' })),
      ]),
    ]),
  ]
})
export class OperationComponent implements OnInit, OnDestroy {

  private _destroyed = new Subject<void>();

  activeOperation: ActiveOperation | null = null;
  isOperationVisible$: Observable<boolean> = this._store.pipe(select(mentalMathSelector.isActiveOperationVisibleSelector));
  areProposalResponseVisible$: Observable<boolean> = this._store.pipe(select(mentalMathSelector.areProposalResponseVisibleSelector));


  /**
   * Stabilise la liste des carte dans le DOM.
   * Cela permet de réutilisé la liste présentz dans le DOM et evite un rechargement des carte lors dun click event
   * @param { number } index - Index de la liste
   * @param { Card } card  - Carte
   * @returns
   */
  trackByCardId(index: number, card: MentalCard): number {
    return card.id;
  }

  trackByPorposalResponseId(index: number, propsalResponse: ProposalResponse ){
    propsalResponse.id;
  }

  constructor(private _store: Store<IAppState>, private _mentalMathematicGameRules: MentalMathematicGameRule){}

  ngOnInit(): void {
    this._store.pipe(select(mentalMathSelector.activeOperationModelSelector))
    .pipe(takeUntil(this._destroyed))
    .subscribe(res => this.activeOperation = res);
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  nextOperation() {
    this._mentalMathematicGameRules.manualyEndRemainingCalculationTime();
  }
}

