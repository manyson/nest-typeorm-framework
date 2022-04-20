import {Injectable, NotFoundException} from '@nestjs/common';
import {UpdateUserDto} from './dto/update-user.dto';
import {Repository} from "typeorm";
import {UserEntity} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {makePasswordHashed} from "../common/util";

@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,) {
  }

  /**
   * 사용자 조회
   * @param userID 사용자 아이디
   * @returns Promise<void>
   */
  async findOne(userID: string): Promise<UserEntity> {
    const data = await this.userRepository.findOneBy({ userID: userID });

    if (!data) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    return data;
  }

  /**
   * 사용자 수정
   * @param id 사용자 아이디
   * @param updateUserDto 사용자 정보 객체
   * @returns Promise<void>
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {

    const data = await this.userRepository.findOneBy({ userID: id });

    if (!data) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    /** 비밀번호 변경 */
    const salt: string = data.salt;
    const newPassword = await makePasswordHashed(updateUserDto.password, salt);
    updateUserDto.password = newPassword;

    const { userName, password } = updateUserDto;

    /** 사용자 변경 */
    const user = await this.userRepository.update({ userID :id }, {userName, password});
    if (user.affected !== 1) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return true;
  }

  /**
   * 사용자 삭제
   * @param id 사용자 아이디
   * @returns Promise<void>
   */
  async remove(id: string): Promise<boolean> {

    /** 사용자 삭제 */
    const deleteUser = await this.userRepository.delete(id);

    if (deleteUser.affected === 0) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return true;
  }
}