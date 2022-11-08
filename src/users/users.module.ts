import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService as AuthService1 } from '../shared/auth/auth.service';


import { HasuraService } from '../service/hasura.service';
import { UsersController } from './users.controller';
import UsersRepo from './users.repo';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService, UsersRepo,HasuraService,ConfigService,AuthService1,JwtService
      ],
      exports: [ UsersRepo, UsersService,AuthService1],
})
export class UsersModule {}
