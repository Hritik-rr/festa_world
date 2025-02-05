import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FirebaseAuthService } from './firebase-config.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseAuthService: FirebaseAuthService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithFirebase(
    // firebaseToken: string,
    email: string,
    password: string,
  ) {
    try {
      // Verify Firebase Token
      // const firebaseUser =
      // await this.firebaseAuthService.verifyToken(firebaseToken);

      // // Generate a JWT token for your application
      // const payload = { uid: firebaseUser.uid, email: firebaseUser.email };
      // const jwtToken = this.jwtService.sign(payload);

      // console.log(jwtToken, 'jwtToken');
      // console.log(payload, 'payload');
      // return { accessToken: jwtToken, user: firebaseUser };
      return createUserWithEmailAndPassword(email, password);
      // console.log(userCredential, 'userCredential');
      // return
    } catch (error) {
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
function createUserWithEmailAndPassword(
  firebaseToken: string,
  password: string,
) {
  throw new Error('Function not implemented.');
}
