import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  email: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'hashed_password' })
  hashedPassword: string;
}