import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      envFilePath: (process.env.NODE_ENV === 'production') ? [`${__dirname}/config/${process.env.NODE_ENV}.env`]
          : (process.env.NODE_ENV === 'stage') ? [`${__dirname}/config/${process.env.NODE_ENV}.env`]
          : [`${__dirname}/config/development.env`]
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
