import { Module , NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
	imports: [ ServeStaticModule.forRoot({
		rootPath: join(__dirname, '..', 'public'), // Ruta al directorio de archivos estáticos (HTML, CSS, etc.)
	  })
	],
	controllers: [AppController],
	providers: [AppService, JwtService],
})
export class AppModule implements NestModule{
	configure(consumer: MiddlewareConsumer) {
		consumer
		  .apply(AuthMiddleware)
		  .forRoutes({ path: 'otros', method: RequestMethod.POST });
	  }
}
