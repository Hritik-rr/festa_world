import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFollowerDto {
  @ApiProperty()
  @IsString()
  followerId: string;

  @ApiProperty()
  @IsString()
  followingId: string;
}
