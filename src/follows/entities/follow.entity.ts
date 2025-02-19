import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('follows')
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Represents the User who initiates the follow action (the one doing the following)
   * Example: If User A follows User B, then User A is the user *FOLLOWING*
   */
  @ManyToOne(() => User, (user) => user.following)
  @JoinColumn({ name: 'follower_id' })
  follower: User;

  /**
   * Represents the User who is being followed(the target of the follow action)
   * Example: If User A follows User B, then User B is the user *BEING FOLLOWED*
   */
  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'following_id' })
  following: User;

  @CreateDateColumn()
  createdAt: Date;
}
