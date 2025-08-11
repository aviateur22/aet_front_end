import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../../store/state';
import * as mentalMathematicSelectors from '../../../store/mentalMathematic/selector';
import { Subject, takeUntil } from 'rxjs';
import { MobileDeviceService } from '../../../../mobile-device/service/mobile-device.service';

@Component({
  selector: 'app-time-remaining',
  templateUrl: './time-remaining.component.html',
  styleUrl: './time-remaining.component.css'
})
export class TimeRemainingComponent implements OnInit, OnDestroy {

  private _destroyed$ = new Subject<void>();
  private _duration: number = 0;

  get duration() {
    return this._duration
  }

  set duration(value: number) {
    this._duration = value;

    if (!this.totalDuration && this._duration > 0) {
      this.totalDuration = this.duration;
    }
    this.updatePercentage();
    this.updateColor();
  }

  totalDuration: number = 0;
  percentage: number = 100;
  colorClass = "#3ce000";

  // Si support sur un téléphone iu tablette
  isOnMobile: boolean = false;

  constructor(private _store: Store<IAppState>, private _mobileDeviceService: MobileDeviceService) {
  }

  ngOnDestroy(): void {
   this._destroyed$.next();
   this._destroyed$.complete();
  }

  ngOnInit(): void {
    this.isOnMobile = this._mobileDeviceService.isOnMobileDevice();
    console.log(this.isOnMobile)
    this._store.pipe(select(mentalMathematicSelectors.activeTimeToCalculateSelector))
        .pipe(takeUntil(this._destroyed$))
        .subscribe(res => {
          if(!res)
            return;

          this.duration = res;
        });
  }

  updatePercentage() {
    if (this.totalDuration > 0) {
        this.percentage = (this.duration / this.totalDuration) * 100;
      } else {
        this.percentage = 0;
      }
    }

  updateColor() {
      if (this.percentage > 70) {
        this.colorClass = '#3ce000';
      } else if (this.percentage > 50) {
        this.colorClass = "#def700ff";
      }else if (this.percentage > 30) {
        this.colorClass = "#fcbb24ff";
      } else {
        this.colorClass = "#f73434";
      }
  }

}

