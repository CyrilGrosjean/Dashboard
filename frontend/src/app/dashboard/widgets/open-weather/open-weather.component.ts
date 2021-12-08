import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
import { OpenWeatherService } from '../../../services/open-weather/open-weather.service';

@Component({
  selector: 'app-open-weather',
  templateUrl: './open-weather.component.html',
  styleUrls: ['./open-weather.component.scss']
})
export class OpenWeatherComponent implements OnInit {

  weather_api = new OpenWeatherService(this.http);
  city_form!: FormGroup;
  intervalId: number = 0;
  result: any = {
    base: "",
    clouds: { all: 0 },
    cod: 0,
    coord: { lon: 0, lat: 0 },
    dt: 0,
    id: 0,
    main: { feels_like: 0, grnd_level: 0, humidity: 0, pressure: 0, sea_level: 0, temp: 0, temp_max: 0, temp_min: 0 },
    name: "",
    sys: { country: '', sunrise: 0, sunset: 0 },
    timezone: 0,
    visibility: 0,
    weather: [{ id: 800, main: '', description: '', icon: '' }],
    wind: { speed: 0, deg: 0, gust: 0 }
  }

  constructor(private sharedService: SharedService, private http: HttpClient) { }

  ngOnInit(): void {

    this.city_form = new FormGroup({
      city: new FormControl(''),
    });
    let re = this.getWeather();
  }

  getWeather() {
    let body = {
      city: 'Paradou'
    }
    this.weather_api.postWeather(body, 'http://localhost:8080/weather/city').subscribe((response) => {
      const obj = JSON.parse(JSON.stringify(response));
      console.log(obj);
      this.result = obj;
    });
    setInterval(() => {
      this.weather_api.postWeather(body, 'http://localhost:8080/weather/city').subscribe((response) => {
        const obj = JSON.parse(JSON.stringify(response));
        console.log(obj);
        this.result = obj;
      });
    }, 300000);
  }


  cityFormSubmit() {
    let body = {
      city: this.city_form.value.city
    }
    this.weather_api.postWeather(body, 'http://localhost:8080/weather/city').subscribe((response) => {
      const obj = JSON.parse(JSON.stringify(response));
      console.log(obj);
      this.result = obj;
    });

    setInterval(() => {
      this.weather_api.postWeather(body, 'http://localhost:8080/weather/city').subscribe((response) => {
        const obj = JSON.parse(JSON.stringify(response));
        console.log(obj);
        this.result = obj;
      });
    }, 300000);
  }
}
