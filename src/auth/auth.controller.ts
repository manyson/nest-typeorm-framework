import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "../guard/local-auth.guard";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ApiBody, ApiCreatedResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LoginUserDto} from "./dto/login-user.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /** 회원 가입 */
  @ApiOperation({
    summary: '회원 가입',
    description: '회원 가입 API',
  })
  @ApiCreatedResponse({
    description: '성공',
  })
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) : Promise<void> {
    await this.authService.create(createUserDto);
  }

  /** 인증 */
  @ApiOperation({
    summary: '회원 로그인',
    description: '회원 로그인 API',
  })
  @ApiBody({type: LoginUserDto})
  @ApiCreatedResponse({
    description: '성공',
    schema: {
      example: {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJtYW55c29uIiwidXNlck5hbWUiOiLsnbTtgazrnoDrp4nthqAiLCJpYXQiOjE2NTA0MjE2OTYsImV4cCI6MTY1MDQyNTI5Nn0.UpwY47dEZHkZuzYnNOARtpYSLlewdm5VSFBWyraeLYs"
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
}
