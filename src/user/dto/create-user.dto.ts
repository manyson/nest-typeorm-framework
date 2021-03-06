import {IsNotEmpty, IsString, Matches} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({
    example: 'manyson',
    description: '사용자 아이디',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userID: string;   /**  사용자 아이디  */

  @ApiProperty({
    example: '이크란막토',
    description: '사용자 이름',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userName: string; /**  사용자 이름   */

  @ApiProperty({
    example: 'q1w2e3!@#',
    description: '사용자 비밀번호',
    required: true,
  })
  @IsNotEmpty()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{6,40}$/)
  password: string;  /**  사용자 비밀번호  */

  salt: string;      /**  salt  */
}
