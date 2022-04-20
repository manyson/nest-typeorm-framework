import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {setupSwagger} from "./swagger/swagger";

async function bootstrap() {

  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'warn'],
  });

  //global Middleware 설정 (cors 속성 활성화)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
  });

  app.useGlobalPipes(
    /** 유효성 검사  */
    new ValidationPipe({
      whitelist: true,              /** DTO 에 없은 속성은 skip      */
      forbidNonWhitelisted: true,   /** 정의 되지 않은 속성이 있는 경우 forbidden error  */
      transform: true,              /** 객체를 자동으로 DTO 로 변환    */
      disableErrorMessages: false,  /** Error Message 를 표시 여부 설정 (true: 표시하지 않음, false: 표시함)  */
  }));

  //Swagger 환경설정 연결
  setupSwagger(app);

  await app.listen(3000);
}

bootstrap();
