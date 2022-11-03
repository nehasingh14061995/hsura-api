import { Injectable } from '@nestjs/common';
import { GetpostParamDto,GetallpostParamDto } from './posts.dto';
import PostsRepo from './posts.repo';
@Injectable()
export class PostsService {
    constructor(
        private readonly PostsRepo: PostsRepo){}
    async addpost(body:any): Promise<void> {
      const user=await this.PostsRepo.addposts(body);
      return user; 
      }
      
      async getPost(): Promise<any[]> {
        const  users =
          await this.PostsRepo.getPosts();
      
        return users;
      }
      async getPostdetail(param:GetpostParamDto): Promise<GetpostParamDto> {
        const { id: postId } = param;
        const  users =
          await this.PostsRepo.getpostdetail(parseInt(postId));
      
        return users;
      }
      async getuserallPostdetail(param:GetallpostParamDto): Promise<GetallpostParamDto> {
        const { userId: userId } = param;
        const  users =
          await this.PostsRepo.getuserallpostdetail(parseInt(userId));
      
        return users;
      }
      async updatepost(body:any,id:any): Promise<void> {
        
        const user=await this.PostsRepo.updateposts(body,id);
        return user; 
        }
        async deletepost(id:any): Promise<void> {
        
          const user=await this.PostsRepo.deleteposts(id);
          return user; 
          }
}
