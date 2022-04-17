import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('TB_USER')
export class UserEntity {
  @PrimaryColumn({ length: 64 })
  user_id: string;

  @Column({ length: 64 })
  user_name: string;

  @Column({ length: 512 })
  password: string;

  @Column({ length: 512 })
  salt: string;
}
