import { Controller,Post,Body, Get,Param, Put, Delete, UseGuards} from '@nestjs/common';
import { AddPostsDto ,GetpostParamDto,GetallpostParamDto,UpdatePostssDto} from './posts.dto';
import { PostsService } from './posts.service';
import { User, UserRoles } from '../users/users.dto';

import { Roles } from '../shared/decorators/roles.decorator';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RolesGuard } from '../shared/guards/role.guard';
import{ GetUser} from'../shared/decorators/get.user.decorator';


@Controller('posts')
export class PostsController {
    constructor(private readonly postservice: PostsService,
      ){}

@Post('/create')
@UseGuards(AuthGuard, RolesGuard)
@Roles("user")
async addposts( @GetUser() user: User,@Body() body: AddPostsDto): Promise<void> {
 
    return this.postservice.addpost(user.id,body);
  }


  @Get('/allposts') 
   @UseGuards(AuthGuard, RolesGuard)
  @Roles("user")
  async getposts( @GetUser() user: User){
   
    return this.postservice.getPost(user.id); 
  }

  @Get('/posts-detail/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("user")
  async getuserdetail(@GetUser() user: User,@Param() param:GetpostParamDto): Promise<GetpostParamDto>{
    
    return this.postservice.getPostdetail(user.id,param); 
  }
  @Get('/users-allpost/:userId')
  async getuserpostdetail(@Param() param:GetallpostParamDto): Promise<GetallpostParamDto>{
    return this.postservice.getuserallPostdetail(param); 
  }
  @Put('/update/post/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("user")
  async updateComment(@GetUser() user: User,@Param('id') id:string,@Body() body: UpdatePostssDto) {
    return this.postservice.updatepost(user.id,body,parseInt(id));
  }
  @Delete('/delete/post/:id')
  async deleteComment(@Param('id') id:string) {
    return this.postservice.deletepost(parseInt(id));
  }
}
