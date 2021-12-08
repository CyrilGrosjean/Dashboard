import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { number } from 'echarts';
import { CardOptions } from '../interfaces/card';
import { SharedService } from './../shared.service';

@Component({
  selector: 'card',
  templateUrl: './widget-card.component.html',
  styleUrls: ['./widget-card.component.scss']
})

export class WidgetCardComponent {
  @Input() card!: CardOptions;
  dragPosition = { x: 0, y: 0 };
  body = {
    id: 0,
    axis: [0, 0],
    name: '',
    color: '',
    size: [0, 0],
    widgetId: 0,
    serviceId: 0,
    userId: 0,
  }

  constructor(private sharedService: SharedService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dragPosition = { x: this.card.axis[0], y: this.card.axis[1]};
    this.body.userId = Number(this.route.snapshot.paramMap.get('id'));
  }

  closeCard() {
    this.sharedService.sendCloseEvent(this.card.id);
  }

  getPrimaryCard() {
    this.sharedService.sendPrimaryCard(this.card.id);
  }

  onDragEnded(event: any) {
    this.body.id = this.card.id;
    this.body.axis[0] = event.source.getRootElement().getBoundingClientRect().x;
    this.body.axis[1] = event.source.getRootElement().getBoundingClientRect().y;
    this.body.name = this.card.name;
    this.body.color = this.card.color;
    this.body.size = this.card.size;
    this.body.widgetId = this.card.serviceId;
    this.body.serviceId = this.card.serviceServiceId;
    this.sharedService.sendCoordCard(this.body)
  }
}
