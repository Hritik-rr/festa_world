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

    for (const userId of followingIds) {
      await this.tweetRepo.findOne({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['user'],
      });
    }

    // Then try a simpler version of our main query
    const queryBuilder = this.tweetRepo
      .createQueryBuilder('tweet')
      .where('tweet.userId IN (:...followingIds)', { followingIds })
      .orderBy('tweet.updatedAt', 'DESC')
      .skip(skip)
      .take(limit);

    // Meant for Debugging; To check raw query and parameters
    // const [rawQuery, parameters] = queryBuilder.getQueryAndParameters();
    // console.log('Simplified Raw Query:', rawQuery);
    // console.log('Parameters:', parameters);

    const result = await queryBuilder.getManyAndCount();
    // console.log('Simplified query result:', result);

    return {
      tweets: result[0],
      meta: {
        total: result[1],
        page,
        limit,
        totalPages: Math.ceil(result[1] / limit),
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} timeline`;
  }
}
