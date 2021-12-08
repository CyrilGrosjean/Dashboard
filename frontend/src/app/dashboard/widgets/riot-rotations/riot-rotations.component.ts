import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { RiotService } from "../../../services/riot/riot.service";

@Component({
    selector: 'app-riot-rotations',
    templateUrl: './riot-rotations.component.html',
    styleUrls: ['./riot-rotations.component.scss']
}) export class RiotRotationsComponent implements OnInit {

    riot_rotations!: FormGroup;
    selected: any = "Normal";
    riot_api = new RiotService(this.http);

    result: any = {
        freeChampionIds: [],
        freeChampionIdsForNewPlayers: [],
        maxNewPlayerLevel: 10,
        version: "",
    }
    widget: any = {
        championList: [],
        level: 0,
    }

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.riot_rotations = new FormGroup({
            rotation: new FormControl('Normal rotation'),
        });
        this.getRotations();
    }

    getRotations() {
        var subject = new Subject<any>();
        this.riot_api.getRotations('http://localhost:8080/riot/rotations').subscribe((response) => {
            const obj = JSON.parse(JSON.stringify(response));
            this.result = obj;
            this.widget.championList = [];
            if (this.riot_rotations.value.rotation === "Normal") {
                this.result.freeChampionIds.forEach((value: any) => {
                    // console.log(value);
                    this.widget.championList.push({ link: `http://ddragon.leagueoflegends.com/cdn/${this.result.version}/img/champion/${value}.png`, name: value });
                });
            } else {
                this.result.freeChampionIdsForNewPlayers.forEach((value: any) => {
                    // console.log(value);
                    this.widget.championList.push({ link: `http://ddragon.leagueoflegends.com/cdn/${this.result.version}/img/champion/${value}.png`, name: value });
                });
                this.widget.level = this.result.maxNewPlayerLevel;
            }
        });
        setInterval(() => {
            this.riot_api.getRotations('http://localhost:8080/riot/rotations').subscribe((response) => {
                const obj = JSON.parse(JSON.stringify(response));
                this.result = obj;
                this.widget.championList = [];
                if (this.riot_rotations.value.rotation === "Normal") {
                    this.result.freeChampionIds.forEach((value: any) => {
                        // console.log(value);
                        this.widget.championList.push({ link: `http://ddragon.leagueoflegends.com/cdn/${this.result.version}/img/champion/${value}.png`, name: value });
                    });
                } else {
                    this.result.freeChampionIdsForNewPlayers.forEach((value: any) => {
                        // console.log(value);
                        this.widget.championList.push({ link: `http://ddragon.leagueoflegends.com/cdn/${this.result.version}/img/champion/${value}.png`, name: value });
                    });
                    this.widget.level = this.result.maxNewPlayerLevel;
                }
            });
        }, 300000);
        this.result = subject.asObservable();
    }

    formSubmit() {
        console.log(this.riot_rotations.value.rotation);
        var subject = new Subject<any>();
        this.riot_api.getRotations('http://localhost:8080/riot/rotations').subscribe((response) => {
            const obj = JSON.parse(JSON.stringify(response));
            this.result = obj;
            this.widget.championList = [];
            if (this.riot_rotations.value.rotation === "Normal") {
                this.result.freeChampionIds.forEach((value: any) => {
                    // console.log(value);
                    this.widget.championList.push({ link: `http://ddragon.leagueoflegends.com/cdn/${this.result.version}/img/champion/${value}.png`, name: value });
                })
            } else {
                this.result.freeChampionIdsForNewPlayers.forEach((value: any) => {
                    // console.log(value);
                    this.widget.championList.push({ link: `http://ddragon.leagueoflegends.com/cdn/${this.result.version}/img/champion/${value}.png`, name: value });
                })
                this.widget.level = this.result.maxNewPlayerLevel;
            }
        });
        setInterval(() => {
            this.riot_api.getRotations('http://localhost:8080/riot/rotations').subscribe((response) => {
                const obj = JSON.parse(JSON.stringify(response));
                this.result = obj;
                this.widget.championList = [];
                if (this.riot_rotations.value.rotation === "Normal") {
                    this.result.freeChampionIds.forEach((value: any) => {
                        // console.log(value);
                        this.widget.championList.push({ link: `http://ddragon.leagueoflegends.com/cdn/${this.result.version}/img/champion/${value}.png`, name: value });
                    })
                } else {
                    this.result.freeChampionIdsForNewPlayers.forEach((value: any) => {
                        // console.log(value);
                        this.widget.championList.push({ link: `http://ddragon.leagueoflegends.com/cdn/${this.result.version}/img/champion/${value}.png`, name: value });
                    })
                    this.widget.level = this.result.maxNewPlayerLevel;
                }
            });
        }, 300000);
        this.result = subject.asObservable();
        // console.log(this.widget);
    }
}