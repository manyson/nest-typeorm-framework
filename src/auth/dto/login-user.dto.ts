import {IsNotEmpty, IsString, Matches} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {

  @ApiProperty({
    example: 'manyson',
    description: '사용자 아이디',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userID: string;   /**  사용자 아이디  */


  @ApiProperty({
    example: 'q1w2e3!@#',
    description: '사용자 비밀번호',
    required: true,
  })
  @IsNotEmpty()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{6,40}$/)
  password: string;  /**  사용자 비밀번호  */
}
