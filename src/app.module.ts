import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserController} from "./user/user.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {AuthModule} from './auth/auth.module';

/** config file  */
const filePath = (process.env.NODE_ENV === 'production') ? [`${__dirname}/config/${process.env.NODE_ENV}.env`]
  : (process.env.NODE_ENV === 'stage') ? [`${__dirname}/config/${process.env.NODE_ENV}.env`]
  : [`${__dirname}/config/development.env`] ;

@Module({
  imports: [
    AuthModule,
    UserModule,
    /** config module 설정    */
    ConfigModule.forRoot({
        envFilePath: filePath
      , isGlobal: true
    }),

    /** Type ORM 설정    */
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DATABASE_SYNCHRONIZE')
      }),
    }),
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  /** middleware 설정    */
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(UserController);
  }
}