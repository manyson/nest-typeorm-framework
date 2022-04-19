import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @author
   * @description 단일 유저 조회
   *
   * @param user_id 유저 아이디
   * @param password 유저 비밀번호
   * @returns User
   */
  async validateUser(user_id: string, password: string): Promise<any> {
    console.log('AuthService');

    const user = await this.userRepository.findOneBy({user_id: user_id});

    //사용자가 요청한 비밀번호와 DB에서 조회한 비밀번호 일치여부 검사
    if (user && user.password === password) {
      const { password, ...result } = user;

      //유저 정보를 통해 토큰 값을 생성
      const accessToken = await this.jwtService.sign(result);

      //토큰 값을 추가한다.
      result['token'] = accessToken;

      //비밀번호를 제외하고 유저 정보를 반환
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { user_id: user.user_id, user_name: user.user_name};
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
