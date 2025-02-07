import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { TweetModule } from './tweet/tweet.module';
import { Tweet } from './tweet/entities/tweet.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FollowerModule } from './follower/follower.module';
import { Follower } from './follower/entities/follower.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASS || 'admin',
      database: process.env.DB_NAME || 'postgres',
      entities: [User, Tweet, Follower], // Register the User entity
      synchronize: true, // Automatically updates DB schema (disable in production)
      logging: false,
    }),
    ConfigModule.forRoot({ cache: true }),
    UserModule,
    TweetModule,
    AuthModule,
    FollowerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
