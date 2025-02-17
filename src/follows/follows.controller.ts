import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FollowsService } from './follows.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('follows')
@ApiBearerAuth()
@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post(':followingId')
  async followUser(
    @Query('id') userId: string,
    @Query('followingId') followingId: string,
  ) {
    return this.followsService.followUser(userId, followingId);
  }

  @Delete(':followingId')
  async unfollowUser(
    @Query('id') userId: string,
    @Query('followingId') followingId: string,
  ) {
    return this.followsService.unfollowUser(userId, followingId);
  }
}
