import { Injectable } from '@nestjs/common';
import { ExchangeRates } from './app.entity'
@Injectable()
export class AppService {

	private exchangeRates: ExchangeRates[] = [
		{
			exchangeRate   : 3.78,
			originCurrency : 'PEN',
			fateCurrency   : 'USD'
		},
		{
			exchangeRate   : 4.15,
			originCurrency : 'PEN',
			fateCurrency   : 'EUR'
		},
		{
			exchangeRate   : 0.55,
			originCurrency : 'PEN',
			fateCurrency   : 'BOB'
		},
	]

	calculateExchangeRate(amount: number, originCurrency : string, fateCurrency: string  ) {
		const tasd = this.exchangeRates.find(exchangeRate => exchangeRate.originCurrency === originCurrency && fateCurrency === exchangeRate.fateCurrency)
		let request = {
			amount,
			amountExchangeRate : amount / tasd.exchangeRate,
			exchangeRate : tasd.exchangeRate,
			originCurrency : tasd.originCurrency,
			fateCurrency : tasd.fateCurrency
		}
		
		return request;
	}
}
