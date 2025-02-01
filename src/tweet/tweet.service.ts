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
  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    const user = await this.userRepo.findOne({
      where: { id: createTweetDto.user.id },
    });
    if (!user) throw new Error('User not found');

    let originalTweet: Tweet | null = null;
    if (createTweetDto.originalTweetId) {
      originalTweet = await this.tweetRepo.findOne({
        where: { id: createTweetDto.originalTweetId },
      });
      if (!originalTweet) {
        throw new Error('Original tweet not found');
      }
    }

    const newTweet = this.tweetRepo.create(createTweetDto);

    return await this.tweetRepo.save(newTweet);
  }

  findAll() {
    return `This action returns all tweet`;
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
