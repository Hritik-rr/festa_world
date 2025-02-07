import { Injectable } from '@nestjs/common';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from './entities/follower.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Follower)
    private readonly followerRepo: Repository<Follower>,
  ) {}

  async followUser(followProfile: CreateFollowerDto): Promise<Follower> {
    const { followerId, followingId } = followProfile;
    const existingFollower = await this.followerRepo.findOne({
      where: { follower: { id: followerId }, following: { id: followingId } },
    });
    if (existingFollower) {
      throw new Error('Already following this user');
    }

    const followingProfile = this.followerRepo.create({
      follower: { id: followerId },
      following: { id: followingId },
    });
    return await this.followerRepo.save(followingProfile);
  }

  async unFollowUser(unFollowProfile: CreateFollowerDto): Promise<Follower> {
    const { followerId, followingId } = unFollowProfile;
    const followingProfile = await this.followerRepo.findOne({
      where: { follower: { id: followerId }, following: { id: followingId } },
    });
    if (!followingProfile) {
      throw new Error('Following profile not found');
    }
    return await this.followerRepo.remove(followingProfile);
  }

  create(createFollowerDto: CreateFollowerDto) {
    return 'This action adds a new follower';
  }

  findAll(): Promise<Follower[]> {
    return this.followerRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} follower`;
  }

  update(id: number, updateFollowerDto: UpdateFollowerDto) {
    return `This action updates a #${id} follower`;
  }

  remove(id: number) {
    return `This action removes a #${id} follower`;
  }
}
