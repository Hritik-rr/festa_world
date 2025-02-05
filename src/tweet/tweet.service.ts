import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet) private readonly tweetRepo: Repository<Tweet>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  // async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
  //   const user = await this.userRepo.findOne({
  //     where: { id: createTweetDto.userId },
  //   });
  //   if (!user) throw new Error('User not found');

  //   let originalTweet: Tweet | null;
  //   if (
  //     createTweetDto.originalTweetId !== '' ||
  //     createTweetDto.originalTweetId !== null
  //   ) {
  //     originalTweet = await this.tweetRepo.findOne({
  //       where: { id: createTweetDto.originalTweetId },
  //     });
  //     if (!originalTweet) {
  //       throw new Error('Original tweet not found');
  //     }
  //   } else {
  //     createTweetDto.originalTweetId = '';
  //   }

  //   const newTweet = this.tweetRepo.create(createTweetDto);
  //   console.log(newTweet);

  //   return await this.tweetRepo.save(newTweet);
  // }

  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    // Find user
    const user = await this.userRepo.findOne({
      where: { id: createTweetDto.userId },
    });
    if (!user) throw new Error('User not found');

    // Create new tweet instance
    const newTweet = new Tweet();
    newTweet.content = createTweetDto.content;
    newTweet.userId = createTweetDto.userId;

    // Handle originalTweetId only if it's a non-empty string
    if (
      createTweetDto.originalTweetId &&
      createTweetDto.originalTweetId.trim() !== ''
    ) {
      const originalTweet = await this.tweetRepo.findOne({
        where: { id: createTweetDto.originalTweetId },
      });
      if (!originalTweet) {
        throw new Error('Original tweet not found');
      }
      newTweet.originalTweetId = originalTweet.id;
    }

    return await this.tweetRepo.save(newTweet);
  }

  async findAll(): Promise<Tweet[]> {
    try {
      return await this.tweetRepo.find();
    } catch (error) {
      throw new Error(`Failed to retrieve tweets: ${error.message}`);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} tweet`;
  }

  update(id: number, updateTweetDto: UpdateTweetDto) {
    return `This action updates a #${id} tweet`;
  }

  remove(id: number) {
    return `This action removes a #${id} tweet`;
  }
}
