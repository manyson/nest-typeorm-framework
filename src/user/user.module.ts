import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {JwtStrategy} from "../strategy/jwt.strategy";

// 사용자 처리 모듈
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})

export class UserModule {}
