import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async followUser(id: string, followingId: string): Promise<Follow> {
    // Check if target user exists
    const targetUser = await this.userRepository.findOne({
      where: { id: followingId },
    });

    if (!targetUser) {
      throw new NotFoundException('User not found.');
    }

    // Check if user is trying to follow themselves
    if (id === followingId) {
      throw new ConflictException('Users cannot follow themselves.');
    }

    // Check if follow relationship already exists
    const existingFollow = await this.followRepository.findOne({
      where: [
        {
          follower: { id: String(id) },
          following: { id: String(followingId) },
        },
      ],
    });

    if (existingFollow) {
      throw new ConflictException('Already following this user.');
    }

    // Create new follow relationship
    const follow = this.followRepository.create({
      follower: { id: id },
      following: { id: followingId },
    });

    return this.followRepository.save(follow);
  }

  async unfollowUser(id: string, followingId: string): Promise<void> {
    const result = await this.followRepository.delete({
      follower: { id: id },
      following: { id: followingId },
    });

    if (result.affected === 0) {
      throw new NotFoundException('Follow relationship not found');
    }
  }
}
