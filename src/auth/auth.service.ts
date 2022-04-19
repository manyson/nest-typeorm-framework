import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {JWT_CONSTANTS} from "../constant/constants";
import {makePasswordHashed} from "../common/util";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 사용자 조회 처리
   * @param userID 사용자 아이디
   * @param password 사용자 비밀번호
   * @returns User|null
   */
  async validateUser(userID: string, password: string): Promise<any> {

    /** 사용자 아이디로 조회  */
    const user = await this.userRepository.findOneBy({userID: userID});

    password = await makePasswordHashed(password, user.salt);

    /** 비밀번호 체크 */
    if (user && user.password === password) {
      const { password, ...result } = user;

      /** 유저 정보를 통해 토큰 값을 생성 */
      const accessToken = this.jwtService.sign(result);

      /** 토큰 값을 추가한다. */
      result[JWT_CONSTANTS.TOKEN] = accessToken;
      return result;
    }
    else{
      return null;
    }
  }

  /**
   * 로그인 처리
   * @param user 사용자 정보
   * @returns object
   */
  async login(user: any) {
    const payload = { userID: user.userID, userName: user.userName};
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
