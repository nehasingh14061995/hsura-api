import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import{AuthService as AuthService1} from'../shared/auth/auth.service';

import { HasuraService } from '../service/hasura.service';
import { PostsController } from './posts.controller';
import PostsRepo from './posts.repo';
import { PostsService } from './posts.service';

@Module({
    controllers: [PostsController],
    providers: [
        PostsService, PostsRepo,HasuraService,ConfigService,AuthService1,JwtService,
      ],
      exports: [ PostsRepo, PostsService,AuthService1], 
})
export class PostsModule {}
