import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HasuraService } from '../service/hasura.service';
import { PostsController } from './posts.controller';
import PostsRepo from './posts.repo';
import { PostsService } from './posts.service';

@Module({
    controllers: [PostsController],
    providers: [
        PostsService, PostsRepo,HasuraService,ConfigService
      ],
      exports: [ PostsRepo, PostsService], 
})
export class PostsModule {}
