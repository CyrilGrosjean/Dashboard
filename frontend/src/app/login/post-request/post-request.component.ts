import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { SocialUser } from "angularx-social-login";
import { Observable, Subject } from "rxjs";

@Component({
  selector: 'app-post-request',
  templateUrl: './post-request.component.html',
  styleUrls: ['./post-request.component.scss']
})
export class PostRequestComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  postLoginData(body: any, url: string): Observable<Object> {
    var subject = new Subject<Object>();
    console.log(body);
    this.http.post(url, {
      title: '',
      body: body
    }) .subscribe(response => {
        subject.next(response);
      });
      return subject.asObservable();
  }

  // HTTP post request to the server and return the repsonse

}
