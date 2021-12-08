import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeService } from 'src/app/services/youtube/youtube.service';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.scss']
})
export class YoutubeVideoComponent implements OnInit {

  youtube_api = new YoutubeService(this.http);
  youtube_video_form!: FormGroup;
  result: any = {
    link: "https://www.youtube.com/embed/"
  };
  videoUrl: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.youtube_video_form = new FormGroup({
      name: new FormControl('')
    });
  }

  youtubeVideoFormSubmit() {
    console.log(this.youtube_video_form.value.name);
    let body = { name: this.youtube_video_form.value.name };
    if (body.name != '') {
      this.youtube_api.getChannelStats(body, 'http://localhost:8080/youtube/video').subscribe(
        (response) => {
          const obj = JSON.parse(JSON.stringify(response));
          var res = obj;
          var index = res.link.indexOf("v=") + 2;
          var vid = res.link.slice(index);
          this.result.link += vid;
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.result.link);
          console.log("result:" + this.videoUrl);
        }
      );
      setInterval(() => {
        this.youtube_api.getChannelStats(body, 'http://localhost:8080/youtube/video').subscribe(
          (response) => {
            const obj = JSON.parse(JSON.stringify(response));
            var res = obj;
            var index = res.link.indexOf("v=") + 2;
            var vid = res.link.slice(index);
            this.result.link += vid;
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.result.link);
            console.log("result:" + this.videoUrl);
          }
        );
      }, 300000);
    }
  }

  ngOnInit(): void {
  }

}
