import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import{AuthService as AuthService1} from'../shared/auth/auth.service';

import { HasuraService } from '../service/hasura.service';
import { ProductsController } from './products.controller';
import ProductsRepo from './products.repo';
import { ProductsService } from './products.service';

@Module({
    controllers: [ProductsController],
    providers: [
        ProductsService, ProductsRepo,HasuraService,ConfigService,AuthService1,JwtService,
      ],
      exports: [ ProductsRepo, ProductsService,AuthService1], 
})
export class ProductsModule {}
