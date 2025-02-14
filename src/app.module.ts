import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { TweetModule } from './tweet/tweet.module';
import { Tweet } from './tweet/entities/tweet.entity';
import { ConfigModule } from '@nestjs/config';
import { FollowerModule } from './follower/follower.module';
import { Follower } from './follower/entities/follower.entity';
import { TimelineModule } from './timeline/timeline.module';
import { LikeModule } from './like/like.module';
import { Like } from './like/entities/like.entity';
import { firebaseConfig } from './config/firebase.config';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASS || 'admin',
      database: process.env.DB_NAME || 'postgres',
      entities: [User, Tweet, Follower, Like],
      synchronize: true,
      logging: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [firebaseConfig],
    }),
    UserModule,
    TweetModule,
    FollowerModule,
    TimelineModule,
    LikeModule,
    AuthModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
