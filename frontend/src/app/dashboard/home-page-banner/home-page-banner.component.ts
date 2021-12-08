import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-page-banner',
  templateUrl: './home-page-banner.component.html',
  styleUrls: ['./home-page-banner.component.scss']
})
export class HomePageBannerComponent implements OnInit {

  pathBanner = 'https://kantanjapon.files.wordpress.com/2014/12/fuji-volcano-japan-asia-geography-cherry-blossom-hd-wallpapers-japan-wallpaper-hd-free-wallpapers-backgrounds-images-fhd-4k-download-2014-2015-2016-1080x675.jpg';
  title = 'bootstrap-popup';
  urlForm!: FormGroup;


  constructor() { }

  ngOnInit(): void {
    this.urlForm = new FormGroup({
      url: new FormControl(''),
    })
  }

  get urlField(): any {
    return this.urlForm.get('url');
  }

  urlFormSubmit(): void {
    console.log(this.urlForm.value);
    this.pathBanner = this.urlForm.value.url;
  }

}
