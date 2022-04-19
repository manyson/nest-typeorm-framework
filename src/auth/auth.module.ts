import {Module} from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {AuthService} from "./auth.service";
import {JwtStrategy} from "../strategy/jwt.strategy";
import {AuthController} from './auth.controller';
import {LocalStrategy} from "../strategy/local.strategy";
import {JWT_CONSTANTS} from "../constant/constants";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_CONSTANTS.SECRET_KEY,                        /** token key           */
      signOptions: { expiresIn: JWT_CONSTANTS.EXPIRED_TIME },  /** token expired time  */
    }),
    TypeOrmModule.forFeature([UserEntity]),             /** 사용 entity          */
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
