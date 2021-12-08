import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { YoutubeService } from '../../../services/youtube/youtube.service';

@Component({
  selector: 'app-youtube-stat',
  templateUrl: './youtube-stat.component.html',
  styleUrls: ['./youtube-stat.component.scss']
})
export class YoutubeStatComponent implements OnInit {

  youtube_api = new YoutubeService(this.http);
  youtube_stat_form!: FormGroup;
  result: any = {}

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.youtube_stat_form = new FormGroup({
      name: new FormControl('')
    });
  }

  youtubeStatFormSubmit() {
    console.log(this.youtube_stat_form.value.name);
    let body = {name: this.youtube_stat_form.value.name};
    if (body.name != '') {
      this.youtube_api.getChannelStats(body, 'http://localhost:8080/youtube/stats').subscribe(
        (response) => {
          const obj = JSON.parse(JSON.stringify(response));
          console.log(obj);
          this.result = obj;
        }
      );
      setInterval(() => {
        this.youtube_api.getChannelStats(body, 'http://localhost:8080/youtube/stats').subscribe(
        (response) => {
          const obj = JSON.parse(JSON.stringify(response));
          console.log(obj);
          this.result = obj;
        }
      );
      }, 300000);
    }
  }
}
