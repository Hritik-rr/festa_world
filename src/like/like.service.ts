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
        where: { id: createLikeDto.userId },
      });
      if (!user) {
        throw new CustomException('User not found.');
      }

      const tweet = await this.tweetRepository.findOne({
        where: { id: createLikeDto.tweetId },
      });
      if (!tweet) {
        throw new CustomException('Tweet not found.');
      }

      if (tweet.userId === user.id) {
        throw new CustomException('You cannot like your own tweet.');
      }

      const doubleLike = await this.likeRepository.findOne({
        where: {
          userId: createLikeDto.userId,
          tweet: { id: createLikeDto.tweetId },
        },
        relations: ['tweet'],
      });

      if (doubleLike) {
        throw new CustomException('You already liked this tweet.');
      }

      await this.tweetRepository.update(
        { id: createLikeDto.tweetId },
        { likesCount: () => 'likesCount + 1' },
      );

      const likeResData = this.likeRepository.create({
        user: user,
        tweet: tweet,
      });
      await this.likeRepository.save(likeResData);

      return {
        likeResData,
      };
    } catch (error) {
      if (error instanceof CustomException) {
        throw error;
      }
      throw new CustomException('Error creating like.');
    }
  }
  async findAll() {
    return await this.likeRepository.find();
  }
}
