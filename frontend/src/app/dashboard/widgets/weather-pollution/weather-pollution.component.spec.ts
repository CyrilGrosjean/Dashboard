import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPollutionComponent } from './weather-pollution.component';

describe('WeatherPollutionComponent', () => {
  let component: WeatherPollutionComponent;
  let fixture: ComponentFixture<WeatherPollutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherPollutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherPollutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
