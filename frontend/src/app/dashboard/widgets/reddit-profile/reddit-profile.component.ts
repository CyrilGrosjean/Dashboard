import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { RedditService } from "src/app/services/reddit/reddit.service";
import { SharedService } from "src/app/shared.service";

@Component({
    selector: 'app-reddit-profile',
    templateUrl: './reddit-profile.component.html',
    styleUrls: ['./reddit-profile.component.scss'],
}) export class RedditProfileComponent implements OnInit {

    reddit_api = new RedditService(this.http);
    reddit_form!: FormGroup;
    selected: any = "Profile";
    isLogged: boolean = false;
    link: any = {
        link: "",
    };
    result: any = {
        coins: 0,
        awardee_karma: 0,
        awarder_karma: 0,
        comment_karma: 0,
        link_karma: 0,
        total_karma: 0,
        gold_creddits: 0,

        name: "",
        id: "",
        created: "",
        num_friends: 0,
        snoovatar_img: "",
    };

    constructor(private sharedService: SharedService, private http: HttpClient, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

    ngOnInit(): void {

        this.reddit_form = new FormGroup({
            type: new FormControl('Profile'),
        });
        this.getRedditProfile();
    }

    getRedditProfile() {
        let body = {
            id: Number(this.route.snapshot.paramMap.get('id')),
        };
        this.reddit_api.postReddit(body, 'http://localhost:8080/reddit/profile').subscribe((value) => {
            const json = JSON.parse(JSON.stringify(value));
            if (json.link) {
                this.link.link = json.link;
                this.isLogged = false;
            } else {
                this.isLogged = true;
                this.result = json;
                this.result.created = new Date(this.result.created * 1000).toDateString();
            }
        });
        setInterval(() => {
            let body = {
                id: Number(this.route.snapshot.paramMap.get('id')),
            };
            this.reddit_api.postReddit(body, 'http://localhost:8080/reddit/profile').subscribe((value) => {
                const json = JSON.parse(JSON.stringify(value));
                if (json.link) {
                    this.link.link = json.link;
                    this.isLogged = false;
                } else {
                    this.isLogged = true;
                    this.result = json;
                }
            });
        }, 30000);
    }

    formSubmit() {
        this.selected = this.reddit_form.value.type;
    }

    loginReddit() {
        window.location.href = this.link.link;
    }

}