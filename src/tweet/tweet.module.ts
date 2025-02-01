import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { Tweet } from './entities/tweet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity'; // Import User entity
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, User])],
  controllers: [TweetController],
  providers: [TweetService],
  exports: [TweetService],
})
export class TweetModule {}
