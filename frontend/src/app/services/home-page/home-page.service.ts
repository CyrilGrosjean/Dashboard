import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private http: HttpClient) { }

  postWidget(body: any, url: string): Observable<Object> {
    var subject = new Subject<Object>();
    console.log(body);
    this.http.post(url, {
      title: '',
      body: body
    }) .subscribe((response: Object) => {
        subject.next(response);
      });
      return subject.asObservable();
  }
}
