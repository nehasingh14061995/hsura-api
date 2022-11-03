import { Controller,Post,Body, Get,Param, Put, Delete} from '@nestjs/common';
import { AddPostsDto ,GetpostParamDto,GetallpostParamDto,UpdatePostssDto} from './posts.dto';

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
  @Put('/update/post/:id')
  async updateComment(@Param('id') id:string,@Body() body: UpdatePostssDto) {
    return this.postservice.updatepost(body,parseInt(id));
  }
  @Delete('/delete/post/:id')
  async deleteComment(@Param('id') id:string) {
    return this.postservice.deletepost(parseInt(id));
  }
}
