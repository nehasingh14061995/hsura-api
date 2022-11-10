import { Injectable } from '@nestjs/common';
import { privateDecrypt } from 'crypto';
import { GetcartParamDto,GetallcartParamDto } from './cart.dto';
import CartRepo from './cart.repo';
@Injectable()
export class CartService {
    constructor(
        private readonly CartRepo: CartRepo){}
    async addcart(userId:string,body:any,total_price:number): Promise<void> {
        total_price=body.quantity*body.price;
      const user=await this.CartRepo.addcart(body,userId,total_price);
      return user; 
      }
      
      async getcart(userId:string): Promise<any[]> {
       
        const  users =
          await this.CartRepo.getcarts(userId);
      
        return users;
      }
    //   async getPostdetail(userId:string,param:GetpostParamDto): Promise<GetpostParamDto> {
    //     const { id: postId } = param;
       
    //     const  users =
    //       await this.PostsRepo.getpostdetail(userId,parseInt(postId));
    
    //     return users;
    //   }
    //   async getuserallPostdetail(param:GetallpostParamDto): Promise<GetallpostParamDto> {
    //     const { userId: userId } = param;
    //     const  users =
    //       await this.PostsRepo.getuserallpostdetail(parseInt(userId));
      
    //     return users;
    //   }
    //   async updatepost(userId:string,body:any,id:any): Promise<void> {
        
    //     const user=await this.PostsRepo.updateposts(userId,body,id);
    //     return user; 
    //     }
    //     async deletepost(id:any): Promise<void> {
        
    //       const user=await this.PostsRepo.deleteposts(id);
    //       return user; 
    //       }
}
