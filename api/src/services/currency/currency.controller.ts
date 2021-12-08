import { Body, Controller, Post } from "@nestjs/common";
import { CurrencyService } from "./currency.service";

@Controller()
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) {};

    @Post('/currency/exchange')
    getExchange(@Body() body): Object {
        const json = body.body;
        return this.currencyService.getExchange(json.actual_currency, json.convert_currency);
    }

    @Post('/currency/crypto')
    getExchangeCrypto(@Body() body): Object {
        const json = body.body;
        return this.currencyService.getExchangeCrypto(json.actual_currency, json.convert_currency);
    }
}