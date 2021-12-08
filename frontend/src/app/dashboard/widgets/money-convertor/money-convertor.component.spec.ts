import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyConvertorComponent } from './money-convertor.component';

describe('MoneyConvertorComponent', () => {
  let component: MoneyConvertorComponent;
  let fixture: ComponentFixture<MoneyConvertorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyConvertorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyConvertorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
