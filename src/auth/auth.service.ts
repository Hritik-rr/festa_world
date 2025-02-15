import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { CustomException } from '../common/exceptions/custom.exception';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async signup(signUpDto: SignUpDto) {
    try {
      // Create user in Firebase
      const firebaseUser = await this.firebaseService.getAuth().createUser({
        email: signUpDto.email,
        password: signUpDto.password,
      });

      // Create user in our database
      const newUser = await this.userService.create({
        firebaseUid: firebaseUser.uid,
        email: signUpDto.email,
        userName: signUpDto.userName,
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
      });

      // Get Firebase token
      const token = await this.firebaseService
        .getAuth()
        .createCustomToken(firebaseUser.uid);

      return {
        user: newUser,
        token,
      };
    } catch (error) {
      console.log('signup error', error);
      throw new CustomException('Error during signup process');
    }
  }

  async login(loginDto: LoginDto) {
    try {
      // Verify user exists in Firebase
      const firebaseUser = await this.firebaseService
        .getAuth()
        .getUserByEmail(loginDto.email);

      // Get user from our database
      const user = await this.userService.findByFirebaseUid(firebaseUser.uid);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Create custom token
      const token = await this.firebaseService
        .getAuth()
        .createCustomToken(firebaseUser.uid);

      return {
        user,
        token,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async findByFirebaseUid(firebaseUid: string): Promise<User> {
    try {
      const user = await this.userRepo.findOneBy({ firebaseUid });
      if (!user) {
        throw new CustomException('User not found');
      }
      return user;
    } catch (error) {
      throw new CustomException('Error fetching user');
    }
  }
}
