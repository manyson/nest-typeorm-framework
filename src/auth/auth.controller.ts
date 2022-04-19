import {Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "../guard/local-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
