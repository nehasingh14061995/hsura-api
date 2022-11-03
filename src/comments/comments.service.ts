import { Injectable } from '@nestjs/common';
import { GetcommentParamDto,GetallcommentParamDto,GetallpostcommentParamDto } from './comments.dto';
import CommentsRepo from './comments.repo';

@Injectable()
export class CommentsService {
    constructor(
    private readonly commentssRepo: CommentsRepo){}
    async addcomment(body:any): Promise<void> {
      const user=await this.commentssRepo.addcomments(body);
      return user; 
      }
      
      async getComment(): Promise<any[]> {
        const  users =
          await this.commentssRepo.getComments();
      
        return users;
      }
      async getCommentdetail(param:GetcommentParamDto): Promise<GetcommentParamDto> {
        const { id: commentId } = param;
        const  users =
          await this.commentssRepo.getcommentdetail(parseInt(commentId));
      
        return users;
      }
      async getuserallCommentdetail(param:GetallcommentParamDto): Promise<GetallcommentParamDto> {
        const { userId: userId } = param;
        const  users =
          await this.commentssRepo.getuserallcommentdetail(parseInt(userId));
      
        return users;
      }
      async getpostallCommentdetail(param:GetallpostcommentParamDto): Promise<GetallpostcommentParamDto> {
        const { postId: postId } = param;
        const  users =
          await this.commentssRepo.getpostallcommentdetail(parseInt(postId));
      
        return users;
      }
      async updatecomment(body:any,id:any): Promise<void> {
        
        const user=await this.commentssRepo.updatecomments(body,id);
        return user; 
        }
        async deletecomment(id:any): Promise<void> {
        
          const user=await this.commentssRepo.deletecomments(id);
          return user; 
          }
        
}
