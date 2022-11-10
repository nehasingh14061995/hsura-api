import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HasuraService } from './service/hasura.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { APP_GUARD } from '@nestjs/core';
import { PostsModule } from './posts/posts.module';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';
import { RolesGuard } from './shared/guards/role.guard';
import{
  AuthModule
} from './shared/auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { CartModule } from './cart/cart.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';

@Module({
  imports: [UsersModule,
  ConfigModule.forRoot({isGlobal:true}),
  PostsModule,
  ProductsModule,
  AuthModule,
  CartModule,
  CommentsModule],
  controllers: [AppController, UsersController, PostsController, CommentsController,ProductsController,CartController],
  providers: [AppService, UsersService,ConfigService, PostsService, CommentsService,ProductsService,CartService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }, ],
})
export class AppModule {}
