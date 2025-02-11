import { Module } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { TimelineController } from './timeline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tweet])],
  controllers: [TimelineController],
  providers: [TimelineService],
})
export class TimelineModule {}
