import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MoneyConvertorService } from 'src/app/services/money-convertor/money-convertor.service';

interface Money {
  view_value: string;
  value: string;
}

@Component({
  selector: 'app-money-convertor',
  templateUrl: './money-convertor.component.html',
  styleUrls: ['./money-convertor.component.scss']
})
export class MoneyConvertorComponent implements OnInit {

  money_api = new MoneyConvertorService(this.http);
  money_form!: FormGroup;
  result: any = 0.00;
  animalControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Money[] = [
    { view_value: 'euro', value: 'EUR' },
    { view_value: 'dollar', value: 'USD' },
    { view_value: 'pound', value: 'GBP' },
    { view_value: 'yen', value: 'JPY' },
    { view_value: 'rupee', value: 'INR' },
    { view_value: 'bitcoin', value: 'BTC' },
    { view_value: 'dinar', value: 'AED' },
    { view_value: 'shekel', value: 'ILS' },
    { view_value: 'won', value: 'KRW' },
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.money_form = new FormGroup({
      actual_currency: new FormControl(''),
      convert_currency: new FormControl(''),
      value_to_convert: new FormControl(''),
    });
  }

  moneyFormSubmit() {
    console.log(this.money_form.value.value_to_convert);
    let body = {
      actual_currency: this.money_form.value.actual_currency.value,
      convert_currency: this.money_form.value.convert_currency.value
    }
    this.money_api.postMoney(body, 'http://localhost:8080/currency/exchange').subscribe((response) => {
      const obj = JSON.parse(JSON.stringify(response));
      console.log(obj);
      let tmp = Number(obj);
      this.result = this.money_form.value.value_to_convert * tmp;
      // round this.result to 2 decimal places
      this.result = this.result.toFixed(2);
      this.result = this.result + ' ' + this.money_form.value.convert_currency.value;
    });
    setInterval(() => {
      this.money_api.postMoney(body, 'http://localhost:8080/currency/exchange').subscribe((response) => {
        const obj = JSON.parse(JSON.stringify(response));
        console.log(obj);
        let tmp = Number(obj);
        this.result = this.money_form.value.value_to_convert * tmp;
        // round this.result to 2 decimal places
        this.result = this.result.toFixed(2);
        this.result = this.result + ' ' + this.money_form.value.convert_currency.value;
      });
    }, 300000);
  }
}
