import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CryptoCurrencyService } from 'src/app/services/crypto-currency/crypto-currency.service';

interface CryptoCurrency {
  view_value: string;
  value: string;
}

@Component({
  selector: 'app-crypto-currency',
  templateUrl: './crypto-currency.component.html',
  styleUrls: ['./crypto-currency.component.scss']
})
export class CryptoCurrencyComponent implements OnInit {

  crypto_api = new CryptoCurrencyService(this.http);
  crypto_form!: FormGroup;
  result: any = 0.00;
  animalControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: CryptoCurrency[] = [
    { view_value: 'Bitcoin', value: 'BTC' },
    { view_value: 'Ethereum', value: 'ETH' },
    { view_value: 'Litecoin', value: 'LTC' },
    { view_value: 'Ripple', value: 'XRP' },
    { view_value: 'Bitcoin Cash', value: 'BCH' },
    { view_value: 'Cardano', value: 'ADA' },
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.crypto_form = new FormGroup({
      actual_currency: new FormControl(''),
      convert_currency: new FormControl(''),
      value_to_convert: new FormControl(''),
    });
  }

  cryptoFormSubmit() {
    console.log(this.crypto_form.value.value_to_convert);
    let body = {
      actual_currency: this.crypto_form.value.actual_currency.value,
      convert_currency: this.crypto_form.value.convert_currency.value
    }
    this.crypto_api.postCrypto(body, 'http://localhost:8080/currency/crypto').subscribe((response) => {
      const obj = JSON.parse(JSON.stringify(response));
      console.log(obj);
      let tmp = Number(obj);
      this.result = this.crypto_form.value.value_to_convert * tmp;
      // round this.result to 2 decimal places
      this.result = this.result.toFixed(2);
      this.result = this.result + ' ' + this.crypto_form.value.convert_currency.value;
    });
    setInterval(() => {
      this.crypto_api.postCrypto(body, 'http://localhost:8080/currency/crypto').subscribe((response) => {
        const obj = JSON.parse(JSON.stringify(response));
        console.log(obj);
        let tmp = Number(obj);
        this.result = this.crypto_form.value.value_to_convert * tmp;
        // round this.result to 2 decimal places
        this.result = this.result.toFixed(2);
        this.result = this.result + ' ' + this.crypto_form.value.convert_currency.value;
      });
    }, 300000);
  }
}
