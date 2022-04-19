import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {UserController} from "./user/user.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {AuthModule} from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,

    /** config module 설정    */
    ConfigModule.forRoot({
      envFilePath: (process.env.NODE_ENV === 'production') ? [`${__dirname}/config/${process.env.NODE_ENV}.env`]
          : (process.env.NODE_ENV === 'stage') ? [`${__dirname}/config/${process.env.NODE_ENV}.env`]
          : [`${__dirname}/config/development.env`]
    }),

    /** type orm 설정         */
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
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(UserController);
  }
}