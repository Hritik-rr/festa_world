import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Tweet } from '../entities/tweet.entity';

export class CreateTweetDto {
  @ApiProperty()
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  user: User;

  @ApiProperty({ required: false })
  @IsString()
  originalTweetId?: string;
}
