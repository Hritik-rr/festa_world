import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FollowerService } from './follower.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';

@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post('follow')
  async followUser(@Body() followProfile: CreateFollowerDto) {
    const followUser = await this.followerService.followUser(followProfile);
    return { message: 'Followed successfully', data: { followUser } };
  }

  @Post('unfollow')
  unFollowUser(@Body() unFollowProfile: CreateFollowerDto) {
    this.followerService.unFollowUser(unFollowProfile);
    return { message: 'Unfollowed successfully' };
  }

  @Post()
  create(@Body() createFollowerDto: CreateFollowerDto) {
    return this.followerService.create(createFollowerDto);
  }

  @Get()
  findAll() {
    return this.followerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.followerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFollowerDto: UpdateFollowerDto,
  ) {
    return this.followerService.update(+id, updateFollowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followerService.remove(+id);
  }
}
