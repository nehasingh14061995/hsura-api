import { Controller,Post,Body, Get,Param} from '@nestjs/common';
import { AddPostsDto ,GetpostParamDto,GetallpostParamDto} from './posts.dto';

import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postservice: PostsService){}

@Post('/create')
async addposts(@Body() body: AddPostsDto): Promise<void> {
    return this.postservice.addpost(body);
  }


  @Get('/allposts')
  async getposts(){
    return this.postservice.getPost(); 
  }
  @Get('/posts-detail/:id')
  async getuserdetail(@Param() param:GetpostParamDto): Promise<GetpostParamDto>{
    return this.postservice.getPostdetail(param); 
  }
  @Get('/users-allpost/:userId')
  async getuserpostdetail(@Param() param:GetallpostParamDto): Promise<GetallpostParamDto>{
    return this.postservice.getuserallPostdetail(param); 
  }
}
