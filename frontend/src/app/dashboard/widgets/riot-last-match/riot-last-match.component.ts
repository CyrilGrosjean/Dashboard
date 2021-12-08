import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { RiotService } from "../../../services/riot/riot.service";

@Component({
    selector: 'app-riot-last-match',
    templateUrl: './riot-last-match.component.html',
    styleUrls: ['./riot-last-match.component.scss']
}) export class RiotLastMatchComponent implements OnInit {

    riot_last_match!: FormGroup;
    selected: any = "Normal";
    riot_api = new RiotService(this.http);

    result: any = {
        duration: 0,
        winners: [],
        losers: [],
        version: "",
    };

    numbers = [0, 1, 2, 3, 4];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.riot_last_match = new FormGroup({
            name: new FormControl(''),
        });
        this.getLastMatch();
    }

    getLastMatch() {
        const body = {
            name: 'El Roran',
        };
        this.riot_api.postLastMatch('http://localhost:8080/riot/lastmatch', body).subscribe((response) => {
            const obj = JSON.parse(JSON.stringify(response));
            this.result = obj;
        });
        setInterval(() => {
            this.riot_api.postLastMatch('http://localhost:8080/riot/lastmatch', body).subscribe((response) => {
                const obj = JSON.parse(JSON.stringify(response));
                this.result = obj;
            });
        }, 300000);
    }

    formSubmit() {
        const body = {
            name: this.riot_last_match.value.name,
        };
        this.riot_api.postLastMatch('http://localhost:8080/riot/lastmatch', body).subscribe((response) => {
            const obj = JSON.parse(JSON.stringify(response));
            this.result = obj;
        });
        setInterval(() => {
            this.riot_api.postLastMatch('http://localhost:8080/riot/lastmatch', body).subscribe((response) => {
                const obj = JSON.parse(JSON.stringify(response));
                this.result = obj;
            });
        }, 300000);
    }
}