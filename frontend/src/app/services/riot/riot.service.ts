import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
}) export class RiotService {
    constructor(private http: HttpClient) { }

    getRotations(url: string): Observable<Object> {
        var subject = new Subject<Object>();

        this.http.get(url).subscribe((response: Object) => {
            subject.next(response);
        });
        return subject.asObservable();
    }

    postLastMatch(url: string, body: any): Observable<Object> {
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