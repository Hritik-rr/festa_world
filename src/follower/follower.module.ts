import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Follower } from './entities/follower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follower, User])],
  controllers: [FollowerController],
  providers: [FollowerService],
  exports: [FollowerService],
})
export class FollowerModule {}
