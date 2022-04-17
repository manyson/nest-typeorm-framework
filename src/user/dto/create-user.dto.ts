import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @MinLength(4)
  @MaxLength(64)
  readonly user_id: string;   /**  사용자 아이디  */

  @IsString()
  @MinLength(4)
  @MaxLength(64)
  readonly user_name: string; /**  사용자 이름   */

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{6,40}$/)
  readonly password: string;  /**  사용자 비밀번호  */

  @IsString()
  @MinLength(4)
  @MaxLength(512)
  readonly salt: string;      /**  salt  */

}
