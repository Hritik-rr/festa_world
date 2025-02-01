import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
// import { Like } from '../../like/entities/like.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 280 })
  content: string; // Text content of the tweet

  @ManyToOne(() => User, (user) => user.tweets, { eager: true })
  user: User; // Reference to the user who posted the tweet

  //   @OneToMany(() => Like, (like) => like.tweet)
  //   likes: Like[]; // Likes on the tweet

  @ManyToOne(() => Tweet, { nullable: true, eager: true })
  originalTweetId: string; // Reference to the original tweet id for retweets

  @CreateDateColumn()
  createdAt: Date; // Date and time the tweet was created

  @UpdateDateColumn()
  updatedAt: Date; // Date and time the tweet was last updated
}
