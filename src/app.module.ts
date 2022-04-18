import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {UserController} from "./user/user.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {AuthModule} from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    /** config module 설정  */
    ConfigModule.forRoot({
      envFilePath: (process.env.NODE_ENV === 'production') ? [`${__dirname}/config/${process.env.NODE_ENV}.env`]
          : (process.env.NODE_ENV === 'stage') ? [`${__dirname}/config/${process.env.NODE_ENV}.env`]
          : [`${__dirname}/config/development.env`]
    }),
    /** type orm 설정 */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      //exclude 함수는 제외 하고싶은 라우터를 등록합니다.
      // .exclude({ path: 'user/create_user', method: RequestMethod.POST }) // 유저 생성
      // .exclude({ path: 'user/user_all', method: RequestMethod.GET }) // 유저 전체 조회
      .forRoutes(UserController); // 1.유저 컨트롤러 등록
  }
}