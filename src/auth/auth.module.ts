import {Module} from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {AuthService} from "./auth.service";
import {JwtStrategy} from "../strategy/jwt.strategy";
import {UserModule} from "../user/user.module";
import { AuthController } from './auth.controller';
import {LocalStrategy} from "../strategy/local.strategy";
import {JWTConstants} from "../constant/constants";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      //토큰 서명 값 설정
      secret: JWTConstants.secret,
      //토큰 유효시간 (임의 60초)
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
