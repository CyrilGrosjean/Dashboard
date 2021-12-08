import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "src/app/services/spotify/spotify.service";
import { SharedService } from "src/app/shared.service";

@Component({
    selector: 'app-spotify-artist',
    templateUrl: './spotify-artist.component.html',
    styleUrls: ['./spotify-artist.component.scss'],
}) export class SpotifyArtistComponent implements OnInit {

    spotify_api = new SpotifyService(this.http);
    music_form!: FormGroup;
    isLogged: boolean = false;
    link: any = {
        link: "",
    };
    result: any = {
        followers: 0,
        genres: [],
        logo: "",
        id: "",
        name: "",
        popularity: 0,
    };

    constructor(private sharedService: SharedService, private http: HttpClient, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

    ngOnInit(): void {

        this.music_form = new FormGroup({
            name: new FormControl(''),
        });
        this.getSpotifyArtist();
    }

    getSpotifyArtist() {
        let body = {
            name: 'Vilk',
            userId: Number(this.route.snapshot.paramMap.get('id')),
        };
        this.spotify_api.postSpotify(body, 'http://localhost:8080/spotify/artist').subscribe((response) => {
            const obj = JSON.parse(JSON.stringify(response));
            if (obj.link) {
                this.isLogged = false;
                this.link.link = obj.link;
            } else {
                this.isLogged = true;
                this.result = obj;
                console.log(this.result);
            }
        });
        setInterval(() => {
            let body = {
                name: 'Vilk',
                userId: Number(this.route.snapshot.paramMap.get('id')),
            };
            this.spotify_api.postSpotify(body, 'http://localhost:8080/spotify/artist').subscribe((response) => {
                const obj = JSON.parse(JSON.stringify(response));
                if (obj.link) {
                    this.isLogged = false;
                    this.link.link = obj.link;
                } else {
                    this.isLogged = true;
                    this.result = obj;
                    console.log(this.result);
                }
            });
        }, 300000);
    }

    formSubmit() {
        let body = {
            name: this.music_form.value.name,
            userId: Number(this.route.snapshot.paramMap.get('id')),
        }
        this.spotify_api.postSpotify(body, 'http://localhost:8080/spotify/artist').subscribe((response) => {
            const obj = JSON.parse(JSON.stringify(response));
            if (obj.link) {
                this.isLogged = false;
                this.link.link = obj.link;
            } else {
                this.isLogged = true;
                this.result = obj;
            }
        });
    }

    loginSpotify() {
        window.location.href = this.link.link;
    }

}