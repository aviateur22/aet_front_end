import { Component, OnDestroy, OnInit } from '@angular/core';
import { MentalCard, ActiveOperation, ProposalResponse } from '../../models/mental-math.model';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import * as mentalMathSelector from "../../../store/mentalMathematic/selector";
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.css',
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
  constructor(private _store: Store<IAppState>){}

  ngOnInit(): void {
    this._store.pipe(select(mentalMathSelector.activeOperationModelSelector))
    .pipe(takeUntil(this._destroyed))
    .subscribe(res => this.activeOperation = res);
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

