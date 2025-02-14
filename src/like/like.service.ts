import { Inject, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { CustomException } from 'src/common/exceptions/custom.exception';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  async create(createLikeDto: CreateLikeDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: createLikeDto.userId,
        },
      });
      if (!user) {
        throw new CustomException('User not found.');
      }

      const tweetId = await this.tweetRepository.findOne({
        where: {
          id: createLikeDto.tweetId,
        },
      });
      if (!tweetId) {
        throw new CustomException('Tweet not found.');
      }

      const likeResData = this.likeRepository.create({
        user: user,
        tweet: tweetId,
      });
      await this.likeRepository.save(likeResData);

      await this.tweetRepository
        .createQueryBuilder()
        .update()
        .set({
          likesCount: () => 'likesCount + 1',
        })
        .where('id = :tweetId', { tweetId: createLikeDto.tweetId })
        .execute();

      return {
        likeResData,
      };
    } catch (error) {
      throw new CustomException('Error creating like.');
    }
  }
  async findAll() {
    return await this.likeRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} like`;
  // }

  // update(id: number, updateLikeDto: UpdateLikeDto) {
  //   return `This action updates a #${id} like`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} like`;
  // }
}
