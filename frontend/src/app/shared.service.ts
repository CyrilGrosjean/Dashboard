import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  private subject = new Subject<any>();
  private test = new Subject<any>();
  private move = new Subject<any>();
  private id = new Subject<any>();

  sendCloseEvent(id: number) {
    this.subject.next(id);
  }

  getCloseEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  sendPrimaryCard(id: number) {
    this.test.next(id);
  }

  getPrimaryCard(): Observable<any> {
    return this.test.asObservable();
  }

  sendCoordCard(body: any) {
    this.move.next(body);
  }

  getCoordCard(): Observable<any> {
    return this.move.asObservable();
  }

  sendIntervalId(id: number) {
    this.id.next(id);
  }

  getIntervalId(): Observable<any> {
    return this.id.asObservable();
  }
}
