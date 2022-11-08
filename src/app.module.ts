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

@Module({
  imports: [UsersModule,
  ConfigModule.forRoot({isGlobal:true}),
  PostsModule,
  AuthModule,
  CommentsModule],
  controllers: [AppController, UsersController, PostsController, CommentsController],
  providers: [AppService, UsersService,ConfigService, PostsService, CommentsService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }, ],
})
export class AppModule {}
