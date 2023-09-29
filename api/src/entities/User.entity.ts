import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: number;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;
}

export default User;
