import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Colors } from '../../interfaces/card';
import { SharedService } from '../../shared.service';
import { ServiceList } from '../../interfaces/service-list';
import { HttpClient } from '@angular/common/http';
import { HomePageService } from 'src/app/services/home-page/home-page.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  widget_api = new HomePageService(this.http);
  clickEventsubscription: Subscription;
  cardList: any[] = [];
  cards: any[] = this.cardList;
  colors = Colors;
  serviceList = ServiceList;
  id: number = 0;
  xy: number = 0;
  userId: any;

  constructor(private sharedService: SharedService, private http: HttpClient, private route: ActivatedRoute) {
    this.clickEventsubscription = this.sharedService.getCloseEvent().subscribe((id) => {
      this.removeWidget(id);
    })
    this.clickEventsubscription = this.sharedService.getPrimaryCard().subscribe((id) => {
      this.setPrimaryWidget(id);
    })
    this.clickEventsubscription = this.sharedService.getCoordCard().subscribe((widget_info) => {
      if (widget_info !== 0) {
        this.updateWidgetDb(widget_info);
      }
    })
  }

  ngOnInit() {
   this.userId = Number(this.route.snapshot.paramMap.get('id'));
   this.loadWidgetDb();
  }

  widgetGenerator(name: string, serviceId: number, serviceServiceId: number, width: number, height: number, widget_number: number) {
    if (width < 20 || width === undefined)
      width = 20;
    if (height < 20 || height === undefined)
      height = 20;
    if (widget_number !== 0) {
      var templateCard = {
        id: widget_number,
        name: name,
        color: "card mb-3 " + this.colors[this.id % this.colors.length],
        axis: [this.xy, this.xy],
        size: [width, height],
        serviceId: serviceId,
        serviceServiceId: serviceServiceId
      };
    } else {
      var templateCard = {
        id: this.id,
        name: name,
        color: "card mb-3 " + this.colors[this.id % this.colors.length],
        axis: [this.xy, this.xy],
        size: [width, height],
        serviceId: serviceId,
        serviceServiceId: serviceServiceId
      };
    }
    return (templateCard);
  }

  addWidget(name: string, width: number, height: number, serviceId: number, serviceServiceId: number) {
    for (let i = 0; i < this.cardList.length; i++) {
      console.log(i);
      this.id = i + 1;
    }
    var templateCard = this.widgetGenerator(name, serviceId, serviceServiceId, width, height, 0);
    this.cardList.push(templateCard);
    this.id++;
    this.xy += 50;
    if (this.xy > 400) {
      this.xy = 0;
    }
    console.log(this.cardList);
    this.addCoordCard(templateCard);
  }

  removeWidget(id: number) {
    const index = this.cardList.findIndex(el => el.id === id)
    this.removeWidgetDb(this.cardList[index].id);
    if (index > -1) {
      this.cardList.splice(index, 1);
    }
    console.log("Card Delete Succesfully: " + id);
    console.log(this.cardList);
  }

  setPrimaryWidget(id: number) {
    // console.log("Primary Card: " + id);
    // console.log("Lisst: ");
    // console.log(this.cardList);
    let tmp = this.cardList.find(el => el.id == id);
    console.log(tmp);

    // console.log("element to prime: ");
    // console.log(tmp);
    const index = this.cardList.findIndex(el => el.id === id)
    if (index > -1) {
      this.cardList.splice(index, 1);
    }
    // console.log("remove element from list: ");
    // console.log(this.cardList);
    this.cardList.push(tmp);
    // console.log("add element to list: ");
  }

  addCoordCard(widget_info: any) {
    let body = {
      userId: this.userId,
      serviceId: widget_info.serviceServiceId,
      widgetId: widget_info.serviceId,
      id: widget_info.id
    }
    this.widget_api.postWidget(body, 'http://localhost:8080/widget/add').subscribe(
      data => {
        console.log("ADD to DB : ");
        console.log(data);
      });
  }

  removeWidgetDb(index: number) {
    let body = {
      userId: this.userId,
      id: index
    }
    // console.log("Remove from db : " + body);
    this.widget_api.postWidget(body, 'http://localhost:8080/widget/remove').subscribe(
      data => {
        console.log("Remove to DB : ");
        console.log(data);
      });
  }

  updateWidgetDb(widget_info: any) {
    // console.log(widget_info);
    let body = {
      coords: [Math.round(widget_info.axis[0]), Math.round(widget_info.axis[1])],
      userId: widget_info.userId,
      id: widget_info.id
    }
    // console.log("Update from db : " + body);
    this.widget_api.postWidget(body, 'http://localhost:8080/widget/update').subscribe(
      data => {
        console.log("UPDATE to DB : ")
        console.log(data);
      });
  }

  loadWidgetDb() {
    let body = {
      userId: this.userId
    }
    this.widget_api.postWidget(body, 'http://localhost:8080/widget/get').subscribe(
      data => {
        console.log(data);
        let tmp = JSON.parse(JSON.stringify(data));
        let width = 0, height = 0, name = '';
        for (let i = 0; i < tmp.length; i++) {
          // console.log(tmp[i]);
          if (tmp[i].widget_id === 0) {
            width = 21;
            height = 22;
            name = 'Weather by City';
          } else if (tmp[i].widget_id === 1) {
            width = 40;
            height = 35;
            name = 'Weather Pollution';
          } else if (tmp[i].widget_id === 2) {
            width = 20;
            height = 22;
            name = 'Riot Rotations';
          } else if (tmp[i].widget_id === 3) {
            width = 31;
            height = 27;
            name = 'Riot last match';
          } else if (tmp[i].widget_id === 4) {
            width = 20;
            height = 40;
            name = 'Reddit Profile';
          } else if (tmp[i].widget_id === 5) {
            width = 20;
            height = 22;
            name = 'Youtube Stat';
          } else if (tmp[i].widget_id === 6) {
            width = 29;
            height = 28;
            name = 'Youtube Video';
          } else if (tmp[i].widget_id === 7) {
            width = 20;
            height = 22;
            name = 'Crypto Currency';
          }  else if (tmp[i].widget_id === 8) {
            width = 20;
            height = 22;
            name = 'Money Currency';
          } else if (tmp[i].widget_id === 9) {
            width = 21;
            height = 33;
            name = 'Spotify track';
          } else if (tmp[i].widget_id === 10) {
            width = 20;
            height = 33;
            name = 'Spotify artist';
          }
          let card_from_db = this.widgetGenerator(name, tmp[i].widget_id, tmp[i].serviceId, width, height, tmp[i].widget_number);
          console.log(this.cardList);
          card_from_db.axis = tmp[i].x_y;
          card_from_db.axis[1] -= 200;
          card_from_db.axis[0] -= 15;
          this.id++;
          this.cardList.push(card_from_db);
        }
      });

  }
}
