import { Component, OnInit } from '@angular/core';
import { map, share, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-hour-pipe',
  template: "{{ time | date: 'hh:mm:ss a' }}"
})
export class HourPipeComponent implements OnInit {
  time = new Date();
  rxTime = new Date();
  intervalId: any;
  subscription: Subscription | undefined;

  constructor() {
  }

  ngOnInit(): void {
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
