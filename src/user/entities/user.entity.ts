import { forwardRef } from '@nestjs/common';
import { Follow } from 'src/follows/entities/follow.entity';
import { Like } from 'src/like/entities/like.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firebaseUid: string;

  @Column({ length: 15, unique: true })
  userName: string;

  @Column({ length: 20 })
  firstName: string;

  @Column({ length: 20 })
  lastName: string;

  @Column({ length: 40, unique: true, nullable: true })
  email: string;

  @OneToMany(() => Tweet, (tweet: Tweet) => tweet.user)
  tweet: Tweet[];

  @OneToMany(() => Follow, (follow: Follow) => follow.follower)
  following: Follow[];

  @OneToMany(() => Follow, (follow: Follow) => follow.following)
  followers: Follow[];

  @OneToMany('Like', (like: Like) => like.user)
  likes: Like[];
}
