import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CustomException } from 'src/common/exceptions/custom.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepo.findOneBy({
        email: createUserDto.email,
      });
      if (existingUser) {
        throw new CustomException('User already exists');
      }

      const newUser = this.userRepo.create(createUserDto);
      const newUserCheck = await this.userRepo.save(newUser);
      return newUserCheck;
    } catch (error) {
      throw new CustomException('Error creating new user.');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepo.find();
    } catch (error) {
      throw new CustomException('Error fetching users.');
    }
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
