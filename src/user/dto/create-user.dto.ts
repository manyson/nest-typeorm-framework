import {IsNotEmpty, IsString, Matches} from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  userID: string;   /**  사용자 아이디  */

  @IsString()
  @IsNotEmpty()
  userName: string; /**  사용자 이름   */

  @IsNotEmpty()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{6,40}$/)
  password: string;  /**  사용자 비밀번호  */

  salt: string;      /**  salt  */
}
