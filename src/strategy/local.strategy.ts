
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "../auth/auth.service";
import {Strategy} from "passport-local";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super({
      usernameField: 'userID'
    });
  }

  /** 아이디와 비밀번호로 사용자 조회  */
  async validate(userID: string, password: string): Promise<any> {

    const user = await this.authService.validateUser(userID, password);

    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}