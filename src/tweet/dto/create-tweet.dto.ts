import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Tweet } from '../entities/tweet.entity';

export class CreateTweetDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsOptional()
  originalTweetId?: string | null;
}
