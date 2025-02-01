import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepo.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = this.userRepo.create(createUserDto);
    const newUserCheck = await this.userRepo.save(newUser);
    return newUserCheck;
  }

  // if (error instanceof QueryFailedError && error.message.includes('duplicate key value violates unique constraint')) {
  //   throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
