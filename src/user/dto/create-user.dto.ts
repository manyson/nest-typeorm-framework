import {IsNotEmpty, IsString, Matches} from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  readonly user_id: string;   /**  사용자 아이디  */

  @IsString()
  @IsNotEmpty()
  readonly user_name: string; /**  사용자 이름   */

  @IsNotEmpty()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{6,40}$/)
  readonly password: string;  /**  사용자 비밀번호  */

  readonly salt: string;      /**  salt  */
}
