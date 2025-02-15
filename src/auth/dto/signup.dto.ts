import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(6, 20)
  password: string;

  @ApiProperty()
  @IsString()
  @Length(1, 15)
  userName: string;

  @ApiProperty()
  @IsString()
  @Length(1, 20)
  firstName: string;

  @ApiProperty()
  @IsString()
  @Length(1, 20)
  lastName: string;
}
