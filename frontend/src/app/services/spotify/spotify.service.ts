import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
}) export class SpotifyService {

    constructor(private http: HttpClient) { }

    postSpotify(body: any, url: string): Observable<Object> {
        var subject = new Subject<Object>();
        this.http.post(url, {
            title: '',
            body: body,
        }).subscribe((response: Object) => {
            subject.next(response);
        });
        return subject.asObservable();
    }
}