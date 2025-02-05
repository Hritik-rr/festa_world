import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  firebaseAuthService: any;
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      // secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: true,
      secretOrKey: 'secret-10',
    });
  }

  async validate(payload: { uid: string; email: string }) {
    return { uid: payload.uid, email: payload.email };
  }

  // async validate(token: string) {
  //   try {
  //     // Verify Firebase ID Token
  //     const decodedToken = await this.firebaseAuthService.verifyToken(token);

  //     return { uid: decodedToken.uid, email: decodedToken.email };
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid Firebase Token');
  //   }
  // }
}
