import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CustomException } from 'src/common/exceptions/custom.exception';
import { Like } from 'src/like/entities/like.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet) private readonly tweetRepo: Repository<Tweet>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Like) private readonly likeRepo: Repository<Like>,
  ) {}

  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    try {
      // Find user
      const user = await this.userRepo.findOne({
        where: { id: createTweetDto.userId },
      });
      if (!user) throw new CustomException('User not found.');

      // Create new tweet instance using repository create method
      const newTweet = this.tweetRepo.create({
        content: createTweetDto.content,
        userId: createTweetDto.userId,
        user: user,
        likesCount: 0,
        originalTweetId: createTweetDto.originalTweetId || undefined,
      });

      if (newTweet.originalTweetId?.trim()) {
        const originalTweet = await this.tweetRepo.findOne({
          where: { id: newTweet.originalTweetId },
        });
        if (!originalTweet) {
          throw new CustomException('Original tweet not found.');
        }
        newTweet.originalTweetId = originalTweet.id;
      }

      // Save and return as Promise<Tweet>
      const savedTweet = await this.tweetRepo.save(newTweet);
      return savedTweet;
    } catch (error) {
      throw new CustomException('Error creating new tweet.');
    }
  }

  async findAll(): Promise<Tweet[]> {
    try {
      return await this.tweetRepo.find();
    } catch (error) {
      throw new CustomException('Failed to retrieve tweets.');
    }
  }
}
