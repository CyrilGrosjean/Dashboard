import { Component, OnInit } from '@angular/core';
import { OpenWeatherService } from '../../../services/open-weather/open-weather.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-weather-pollution',
  templateUrl: './weather-pollution.component.html',
  styleUrls: ['./weather-pollution.component.scss']
})
export class WeatherPollutionComponent implements OnInit {

  weather_api = new OpenWeatherService(this.http);
  weather_pollution_form!: FormGroup;
  result: any = {}

  multi = [
    {
      "name": "co",
      "series": [
        {
          "name": "",
          "value": 0
        },
      ]
    },
    {
      "name": "no",
      "series": [
        {
          "name": "",
          "value": 0
        },
      ]
    },
    {
      "name": "no2",
      "series": [
        {
          "name": "",
          "value": 0
        },
      ]
    },
    {
      "name": "o3",
      "series": [
        {
          "name": "",
          "value": 0
        },
      ]
    },
    {
      "name": "so2",
      "series": [
        {
          "name": "",
          "value": 0
        },
      ]
    },
    {
      "name": "pm2_5",
      "series": [
        {
          "name": "",
          "value": 0
        },
      ]
    },
    {
      "name": "pm10",
      "series": [
        {
          "name": "",
          "value": 0
        },
      ]
    },
    {
      "name": "nh3",
      "series": [
        {
          "name": "",
          "value": 0
        },
      ]
    },
  ];

  single: any[] = [];

  view: [number, number] = [600, 400];

  update$: Subject<any> = new Subject();

  // options
  showXAxis = true;
  legend: boolean = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Concentration in µg/m3';
  timeline: boolean = true;

  colorScheme: string | any = {
    domain: ['#FA3D14', '#F1EB27', '#86F127', '#18D9F7', '#1278F3', '#2944EF', '#A877EF', '#E91BF3']
  };
  autoScale = true;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.weather_pollution_form = new FormGroup({
      city: new FormControl(''),
      start: new FormControl(''),
      end: new FormControl(''),
    });
  }
  cityFormSubmit() {
    var starttimestamp = (new Date(this.weather_pollution_form.value.start)).getTime() / 1000;
    var endtimestamp = (new Date(this.weather_pollution_form.value.end)).getTime() / 1000;
    var body = {
      city: this.weather_pollution_form.value.city,
      start: starttimestamp,
      end: endtimestamp
    }
    this.weather_api.postWeather(body, 'http://localhost:8080/weather/pollution').subscribe(
      (response) => {
        const obj = JSON.parse(JSON.stringify(response));
        if (obj.list.length <= 0) {
          return;
        }
        this.multi.forEach((value) => {
          value.series = [];
        });
        obj.list.forEach((item: any) => {
          const date = new Date(item.dt * 1000);
          let dateValue = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:00`;
          this.multi[0].series.push({
            "name": dateValue,
            "value": item.components.co,
          });
          this.multi[1].series.push({
            "name": dateValue,
            "value": item.components.no,
          });
          this.multi[2].series.push({
            "name": dateValue,
            "value": item.components.no2,
          });
          this.multi[3].series.push({
            "name": dateValue,
            "value": item.components.o3,
          });
          this.multi[4].series.push({
            "name": dateValue,
            "value": item.components.so2,
          });
          this.multi[5].series.push({
            "name": dateValue,
            "value": item.components.pm2_5,
          });
          this.multi[6].series.push({
            "name": dateValue,
            "value": item.components.pm10,
          });
          this.multi[7].series.push({
            "name": dateValue,
            "value": item.components.nh3,
          });
        });
        this.multi = [...this.multi];
      }
    );
    setInterval(() => {
      this.weather_api.postWeather(body, 'http://localhost:8080/weather/pollution').subscribe(
      (response) => {
        const obj = JSON.parse(JSON.stringify(response));
        if (obj.list.length <= 0) {
          return;
        }
        this.multi.forEach((value) => {
          value.series = [];
        });
        obj.list.forEach((item: any) => {
          const date = new Date(item.dt * 1000);
          let dateValue = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:00`;
          this.multi[0].series.push({
            "name": dateValue,
            "value": item.components.co,
          });
          this.multi[1].series.push({
            "name": dateValue,
            "value": item.components.no,
          });
          this.multi[2].series.push({
            "name": dateValue,
            "value": item.components.no2,
          });
          this.multi[3].series.push({
            "name": dateValue,
            "value": item.components.o3,
          });
          this.multi[4].series.push({
            "name": dateValue,
            "value": item.components.so2,
          });
          this.multi[5].series.push({
            "name": dateValue,
            "value": item.components.pm2_5,
          });
          this.multi[6].series.push({
            "name": dateValue,
            "value": item.components.pm10,
          });
          this.multi[7].series.push({
            "name": dateValue,
            "value": item.components.nh3,
          });
        });
        this.multi = [...this.multi];
      }
    );
    }, 300000)
  }

  onSelect(data: any): void {
  }

  onActivate(data: any): void {
  }

  onDeactivate(data: any): void {
  }
}
