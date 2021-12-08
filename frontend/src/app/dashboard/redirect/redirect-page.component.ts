import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RedditService } from "src/app/services/reddit/reddit.service";
import { SpotifyService } from "src/app/services/spotify/spotify.service";
import { SharedService } from "src/app/shared.service";

@Component({
    selector: 'app-redirect-page',
    templateUrl: './redirect-page.component.html',
    styleUrls: ['./redirect-page.component.scss']
}) export class RedirectPageComponent {

    serviceId: number = 0;
    spotifyApi = new SpotifyService(this.http);
    redditApi = new RedditService(this.http);

    constructor(private sharedService: SharedService, private http: HttpClient, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.serviceId = Number(this.route.snapshot.paramMap.get('id'));
        this.route.queryParams.subscribe(params => {
            const userId = Number(params['state']);
            const code = params['code'];

            if (this.serviceId === 1) {
                let body = {
                    state: userId.toString(),
                    code: code,
                    user: userId,
                };
                this.spotifyApi.postSpotify(body, 'http://localhost:8080/spotify/login').subscribe((response) => {
                    window.location.href = 'http://localhost:4200/home/' + userId.toString();
                });
            } else if (this.serviceId === 2) {
                let body = {
                    state: userId.toString(),
                    access_token: code,
                    user: userId,
                };
                this.redditApi.postReddit(body, 'http://localhost:8080/reddit/authenticate').subscribe((response) => {
                    window.location.href = 'http://localhost:4200/home/' + userId.toString();
                });
            }
        });
    }

}