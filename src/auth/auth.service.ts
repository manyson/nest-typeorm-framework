import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {JWT_CONSTANTS} from "../constant/constants";
import {createSalt, makePasswordHashed} from "../common/util";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 사용자 생성
   * @param createUserDto 사용자 정보 객체
   * @returns Promise<void>
   */
  async create(createUserDto: CreateUserDto) : Promise<void>  {

    /** 사용자 조회  */
    const data = await this.userRepository.findOneBy({ userID: createUserDto.userID });

    /** 데이터 중복  */
    if (data) {
      throw new UnprocessableEntityException('중복된 아이디 입니다');
    }

    /** 개인 salt 만들기  */
    const salt       =  await createSalt();

    /** 입력 받은 비밀번호 암호화 */
    const password  = await makePasswordHashed(createUserDto.password, salt);


    /** 사용자 입력  */
    const user = new UserEntity();
    user.userID    = createUserDto.userID   ;
    user.userName  = createUserDto.userName ;
    user.password  = password ;
    user.salt      = salt     ;

    await this.userRepository.save(user);
  }

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
