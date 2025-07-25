import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../../../models/memoryCardGame/card.model';
import { MemoryCardGameRules } from '../../../business/memory-card-game-rule';
import { trigger, transition, style, animate, state } from '@angular/animations';
import apiUrl from '../../../../../../misc/api.url';
import * as cardGameSelector from '../../../store/memoryCardGame/selector';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import { map, Observable, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() card!: Card;
  @Input() isGameReadyToPlay!: boolean | null;

  frontImageNameUrl: string = '';
  backImageNameUrl: string = '';

  flipForward = true;
  // isCardreturn: Observable<boolean> =of(false);

  private _destroy$ = new Subject<void>();

  constructor(private _memoryCardGameRules: MemoryCardGameRules, private _store: Store<IAppState>) {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.frontImageNameUrl = apiUrl.streamImage.url.replace('{imageName}', this.card.cardImages.cardFrontImageName);
    this.backImageNameUrl = apiUrl.streamImage.url.replace('{imageName}', this.card.cardImages.cardBackImageName);
    this._store.pipe(select(cardGameSelector.selectCardById(this.card.id)), takeUntil(this._destroy$))
      .subscribe( res => {
        if(res)
          requestAnimationFrame(() => {
            if(res.isCardReturned)
              this.flipForward = true;
            else
              this.flipForward = false;

            console.log(res.isCardReturned, this.flipForward);
      });
      });
      // this._store.pipe(select(cardGameSelector.selectCardById(this.card.id)))
      // .pipe(map(res => res?.isCardToFind), takeUntil(this._destroy$))
      // .subscribe(isCardreturn => {
      //     requestAnimationFrame(() => {
      //     if(isCardreturn)
      //          this.flipForward = true;
      //       else
      //         this.flipForward = false;
      //     });
      //   }
      // );
  }


  returnCard(): void {
    this.flipForward = !this.flipForward;
    this._memoryCardGameRules.cardClick(this.card);
  }
}
