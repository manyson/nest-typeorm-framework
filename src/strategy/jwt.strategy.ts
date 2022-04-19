import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {JWT_CONSTANTS} from "../constant/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), /** Authorization 에서 Bearer Token 에 JWT 토큰을 담아 전송 */
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANTS.SECRET_KEY
    });
  }

  /** 정상적으로 validate 되었을 때 호출 되는 함수 */
  async validate(payload: any) {
    return { userId: payload, username: payload.username };
  }
}