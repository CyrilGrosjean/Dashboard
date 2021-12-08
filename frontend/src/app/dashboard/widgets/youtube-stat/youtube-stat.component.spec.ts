import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeStatComponent } from './youtube-stat.component';

describe('YoutubeStatComponent', () => {
  let component: YoutubeStatComponent;
  let fixture: ComponentFixture<YoutubeStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
