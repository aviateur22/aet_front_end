import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../../models/memoryCardGame/card.model';
import { take } from 'rxjs';
import { IAppState } from '../../../../../store/state';
import { select, Store } from '@ngrx/store';
import * as selectors from '../../../store/memoryCardGame/selector';
import { MemoryCardGameRules } from '../../../core/memory-card-game-rule';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input() card!: Card;
  @Input() isGameReadyToPlay!: boolean | null;

  constructor(private _memoryCardGameRules: MemoryCardGameRules) {}

  ngOnInit(): void {

  }

  returnCard(): void {
    this._memoryCardGameRules.cardClick(this.card);
  }
}
