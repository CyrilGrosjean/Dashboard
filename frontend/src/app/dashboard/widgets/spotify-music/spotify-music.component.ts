import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "src/app/services/spotify/spotify.service";
import { SharedService } from "src/app/shared.service";

@Component({
    selector: 'app-spotify-music',
    templateUrl: './spotify-music.component.html',
    styleUrls: ['./spotify-music.component.scss'],
}) export class SpotifyMusicComponent implements OnInit {

    spotify_api = new SpotifyService(this.http);
    music_form!: FormGroup;
    url: string = "";
    result: SafeUrl | any;
    link: any = {
        link: "",
    };

    constructor(private sharedService: SharedService, private http: HttpClient, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

    ngOnInit(): void {

        this.music_form = new FormGroup({
            name: new FormControl(''),
        });
        this.getSpotifyMusic();
    }

    getSpotifyMusic() {
        let body = {
            name: 'Millionaire',
            userId: Number(this.route.snapshot.paramMap.get('id')),
        };
        this.spotify_api.postSpotify(body, 'http://localhost:8080/spotify/track').subscribe((response) => {
            const obj = JSON.parse(JSON.stringify(response));
            if (obj.result) {
                this.url = obj.result;
                this.result = "https://open.spotify.com/embed/" + obj.result;
                console.log(this.result);
            } else if (obj.link) {
                this.url = "";
                this.link.link = obj.link;
            }
        });
        setInterval(() => {
            let body = {
                name: 'Millionaire',
                userId: Number(this.route.snapshot.paramMap.get('id')),
            };
            this.spotify_api.postSpotify(body, 'http://localhost:8080/spotify/track').subscribe((response) => {
                const obj = JSON.parse(JSON.stringify(response));
                if (obj.result) {
                    this.url = obj.result;
                    this.result = "https://open.spotify.com/embed/" + obj.result;
                    console.log(this.result);
                } else if (obj.link) {
                    this.url = "";
                    this.link.link = obj.link;
                }
            });
        }, 30000);
    }

    formSubmit() {
        let body = {
            name: this.music_form.value.name,
            userId: Number(this.route.snapshot.paramMap.get('id')),
        }
        this.spotify_api.postSpotify(body, 'http://localhost:8080/spotify/track').subscribe((response) => {
            const obj = JSON.parse(JSON.stringify(response));
            if (obj.result) {
                this.url = obj.result;
                this.result = "https://open.spotify.com/embed/" + obj.result;
            } else if (obj.link) {
                this.url = "";
                this.link.link = obj.link;
            }
        });
    }

    loginSpotify() {
        window.location.href = this.link.link;
    }

}