import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HasuraService } from '../service/hasura.service';
import { CommentsController } from './comments.controller';
import CommentsRepo from './comments.repo';
import { CommentsService } from './comments.service';

@Module({
    controllers: [CommentsController],
    providers: [
        CommentsService, CommentsRepo,HasuraService,ConfigService
      ],
      exports: [ CommentsRepo, CommentsService], 
})
export class CommentsModule {
   
}
