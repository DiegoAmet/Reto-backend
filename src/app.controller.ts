import { Body, Controller, Get, Post, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { ConversionRequest } from './app.dto'
import { sign } from 'jsonwebtoken';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

	@Post('api')
	calculateExchangeRate(@Body() data: ConversionRequest) {
		return this.appService.calculateExchangeRate(data.amount, data.originCurrency, data.fateCurrency);
	}

	@Get('api/generateToken')
	generarToken(){
		const token = sign({ 'user' : 'default'}, 'clave12345678', { expiresIn: '1h' });
		return {token: token};
	}

	@Get()
	serveStaticPage(@Res() res: Response) {
	  return res.sendFile("index.html", { root: 'public' });
	}
}
