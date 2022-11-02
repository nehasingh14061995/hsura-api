import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HasuraService } from '../service/hasura.service';
import { UsersController } from './users.controller';
import UsersRepo from './users.repo';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService, UsersRepo,HasuraService,ConfigService
      ],
      exports: [ UsersRepo, UsersService],
})
export class UsersModule {}
