import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../../models/memoryCardGame/card.model';
import { MemoryCardGameRules } from '../../../core/memory-card-game-rule';
import { trigger, transition, style, animate, state } from '@angular/animations';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CardComponent implements OnInit {

  @Input() card!: Card;
  @Input() isGameReadyToPlay!: boolean | null;

  constructor(private _memoryCardGameRules: MemoryCardGameRules) {}

  ngOnInit(): void {}


  returnCard(): void {
    this._memoryCardGameRules.cardClick(this.card);
  }
}
