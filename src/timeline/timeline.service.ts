import { Injectable } from '@nestjs/common';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { Follow } from 'src/follows/entities/follow.entity';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepo: Repository<Tweet>,
    @InjectRepository(Follow)
    private readonly followRepo: Repository<Follow>,
  ) {}

  async findAll(userId: string, page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit;

    const followingUsers = await this.followRepo.find({
      where: {
        follower: { id: userId },
      },
      relations: ['following'],
    });

    const followingIds = followingUsers.map((follow) => follow.following.id);

    // If no following users, return empty result
    if (followingIds.length === 0) {
      return {
        tweets: [],
        meta: {
          total: 0,
          page,
          limit,
          totalPages: 0,
        },
      };
    }

    const [tweets, count] = await this.getTimelineTweets(
      followingIds,
      skip,
      limit,
    );
    console.log('tweets', tweets);

    return {
      tweets,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  private async getTimelineTweets(
    followingIds: string[],
    skip: number,
    limit: number,
  ): Promise<[Tweet[], number]> {
    console.log('Following IDs:', followingIds);

    try {
      // IMPORTANT: Log the repository metadata
      // console.log(
      //   'Tweet entity columns:',
      //   this.tweetRepo.metadata.columns.map((col) => col.propertyName),
      // );

      const queryBuilder = this.tweetRepo
        .createQueryBuilder('tweet')
        .innerJoinAndSelect('tweet.user', 'user') // Changed to innerJoin
        .where('user.id IN (:...followingIds)', { followingIds }) // Changed to reference user.id
        .orderBy('tweet.updatedAt', 'DESC')
        .skip(skip)
        .take(limit);

      // IMPORTANT: Log the raw SQL and parameters
      // const [rawQuery, parameters] = queryBuilder.getQueryAndParameters();
      // console.log('Raw Query:', rawQuery);
      // console.log('Parameters:', parameters);

      const result = await queryBuilder.getManyAndCount();
      console.log('Query executed successfully');
      console.log('Number of tweets found:', result[1]);

      return result;
    } catch (error) {
      console.error('QueryBuilder Error:', error);
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} timeline`;
  }
}
