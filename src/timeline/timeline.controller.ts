import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';
import { CustomException } from 'src/common/exceptions/custom.exception';
@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get('all')
  async findAll(
    @Query('id') id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    if (page >= 1 && limit >= 5) {
      try {
        return await this.timelineService.findAll(id, +page, +limit);
      } catch (error) {
        throw new CustomException('Failed to fetch timeline');
      }
    } else {
      throw new CustomException('Invalid page or limit');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timelineService.findOne(+id);
  }
}
