import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

@Entity('TB_USER')
export class UserEntity extends BaseEntity {

  @PrimaryColumn({name:'user_id', type: 'varchar', length: 64, comment: '유저 아이디' })
  userID: string;

  @Column({name:'user_name', type: 'varchar', length: 64, comment: '유저 이름' })
  userName: string;

  @Column({ type: 'varchar', length: 512, comment: '유저 비밀번호' })
  password: string;

  @Column({ type: 'varchar', length: 512, comment: 'salt' })
  salt: string;
}
