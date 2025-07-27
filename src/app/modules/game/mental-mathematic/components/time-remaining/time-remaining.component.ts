import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-time-remaining',
  templateUrl: './time-remaining.component.html',
  styleUrl: './time-remaining.component.css'
})
export class TimeRemainingComponent {
 @Input() duration: number = 0; // remaining time passed from parent
 totalDuration: number = 0;
 percentage: number = 100;
 colorClass = "#3ce000";

  ngOnChanges(changes: SimpleChanges) {
      if (changes['duration']) {
        // on first non-zero input, store totalDuration
        if (!this.totalDuration && this.duration > 0) {
          this.totalDuration = this.duration;
        }
        this.updatePercentage();
        this.updateColor();
      }
    }

    updatePercentage() {
    if (this.totalDuration > 0) {
        this.percentage = (this.duration / this.totalDuration) * 100;
      } else {
        this.percentage = 0;
      }
    }
    updateColor() {
      if (this.percentage > 60) {
        this.colorClass = '#3ce000';
      } else if (this.percentage > 30) {
        this.colorClass = "#ebb434";
      } else {
        this.colorClass = "#f73434";
      }
    }

}
