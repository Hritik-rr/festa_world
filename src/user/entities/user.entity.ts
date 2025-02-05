import { Tweet } from 'src/tweet/entities/tweet.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 15, unique: true })
  userName: string;

  @Column({ length: 20 })
  firstName: string;

  @Column({ length: 20 })
  lastName: string;

  @Column({ length: 16, unique: true })
  email: string;

  @OneToMany(() => Tweet, (tweet) => tweet.userId)
  tweets: Tweet[];
}
