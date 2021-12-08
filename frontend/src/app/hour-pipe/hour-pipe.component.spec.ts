import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourPipeComponent } from './hour-pipe.component';

describe('HourPipeComponent', () => {
  let component: HourPipeComponent;
  let fixture: ComponentFixture<HourPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourPipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
