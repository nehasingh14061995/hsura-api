import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import{AuthService as AuthService1} from'../shared/auth/auth.service';

import { HasuraService } from '../service/hasura.service';
import { CartController } from './cart.controller';
import CartRepo from './cart.repo';
import { CartService } from './cart.service';

@Module({
    controllers: [CartController],
    providers: [
        CartService, CartRepo,HasuraService,ConfigService,AuthService1,JwtService,
      ],
      exports: [ CartRepo, CartService,AuthService1], 
})
export class CartModule {}
