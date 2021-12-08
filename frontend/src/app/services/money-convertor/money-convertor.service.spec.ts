import { TestBed } from '@angular/core/testing';

import { MoneyConvertorService } from './money-convertor.service';

describe('MoneyConvertorService', () => {
  let service: MoneyConvertorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneyConvertorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
