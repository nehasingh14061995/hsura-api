import { Controller ,Body,Get,Post,Param,Put, Delete} from '@nestjs/common';
import { AddCommentsDto, GetcommentParamDto,GetallcommentParamDto,GetallpostcommentParamDto,UpdateCommentsDto } from './comments.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentservice: CommentsService){}
    @Post('/create')
async addposts(@Body() body: AddCommentsDto): Promise<void> {
    return this.commentservice.addcomment(body);
  }


  @Get('/allcomments')
  async getposts(){
    return this.commentservice.getComment(); 
  }
  @Get('/comments-detail/:id')
  async getuserdetail(@Param() param:GetcommentParamDto): Promise<GetcommentParamDto>{
    return this.commentservice.getCommentdetail(param); 
  }
  @Get('/users-allcomment/:userId')
  async getuserpostdetail(@Param() param:GetallcommentParamDto): Promise<GetallcommentParamDto>{
    return this.commentservice.getuserallCommentdetail(param); 
  }
  @Get('/posts-allcomment/:postId')
  async getpostdetail(@Param() param:GetallpostcommentParamDto): Promise<GetallpostcommentParamDto>{
    return this.commentservice.getpostallCommentdetail(param); 
  }
  @Put('/update/comment/:id')
  async updateComment(@Param('id') id:string,@Body() body: UpdateCommentsDto) {
    return this.commentservice.updatecomment(body,parseInt(id));
  }
  @Delete('/delete/comment/:id')
  async deleteComment(@Param('id') id:string) {
    return this.commentservice.deletecomment(parseInt(id));
  }
}
