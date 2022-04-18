
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "../auth/auth.service";
import {Strategy} from "passport-local";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super({
      usernameField: 'user_id'
    });
  }

  async validate(user_id: string, password: string): Promise<any> {

    const user = await this.authService.validateUser(user_id, password);

    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}