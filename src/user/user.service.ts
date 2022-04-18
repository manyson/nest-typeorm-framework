import {Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Repository} from "typeorm";
import {UserEntity} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,) {
  }

  async create(createUserDto: CreateUserDto) : Promise<void>  {

    const data = await this.userRepository.findOneBy({ user_id: createUserDto.user_id });

    if (data) {
      throw new UnprocessableEntityException('중복된 아이디 입니다');
    }

    // 사용자 입력
    const user = new UserEntity();
    user.user_id   = createUserDto.user_id;
    user.user_name = createUserDto.user_name;
    user.password  = createUserDto.password ;
    user.salt      = "SALT";

    await this.userRepository.save(user);
  }

  findAll() : Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const data = await this.userRepository.findOneBy({ user_id: id });

    if (!data) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {

    const { user_name, password } = updateUserDto;

    // 변경된 user 정보
    const user = await this.userRepository.update({ user_id :id }, {user_name, password});
    if (user.affected !== 1) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return true;
  }

  async remove(id: string): Promise<boolean> {
    const deleteUser = await this.userRepository.delete(id);

    if (deleteUser.affected === 0) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return true;
  }
}
