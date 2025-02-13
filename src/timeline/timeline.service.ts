import { Injectable } from '@nestjs/common';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from 'src/tweet/entities/tweet.entity';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepo: Repository<Tweet>,
  ) {}

  async findAll(page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit;

    const [tweets, total] = await this.tweetRepo.findAndCount({
      order: {
        updatedAt: 'DESC',
      },
      take: limit,
      skip: skip,
    });

    return {
      tweets,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  create(createTimelineDto: CreateTimelineDto) {
    return 'This action adds a new timeline';
  }

  findOne(id: number) {
    return `This action returns a #${id} timeline`;
  }

  update(id: number, updateTimelineDto: UpdateTimelineDto) {
    return `This action updates a #${id} timeline`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeline`;
  }
}
