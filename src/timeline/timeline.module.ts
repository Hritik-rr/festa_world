import { Module } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { TimelineController } from './timeline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { Follow } from 'src/follows/entities/follow.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Tweet, Follow])],
  controllers: [TimelineController],
  providers: [TimelineService],
})
export class TimelineModule {}
