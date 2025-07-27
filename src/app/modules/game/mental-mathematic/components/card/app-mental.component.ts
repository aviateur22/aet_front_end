import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MentalCard } from '../../models/mental-math.model';
import apiUrl from '../../../../../../misc/api.url';
import * as mentalMathematicSelector from '../../../store/mentalMathematic/selector';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import { map, Observable, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-mental-card',
  templateUrl: './app-mental.component.html',
  styleUrl: './app-mental.component.css'
})
export class CardMentalComponent implements OnInit, OnDestroy {

  @Input() mentalCard!: MentalCard;
  @Input() isGameReadyToPlay!: boolean | null;

  backImageNameUrl: string = '';

  flipForward = true;

  private _destroy$ = new Subject<void>();

  constructor(private _store: Store<IAppState>) {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.backImageNameUrl = apiUrl.streamImage.url.replace('{imageName}', this.mentalCard.cardBackImageName);


    setTimeout(()=> this.flipForward = false, 1000);

  }
}
