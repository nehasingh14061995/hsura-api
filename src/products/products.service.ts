import { Injectable } from '@nestjs/common';
import { GetproductParamDto,GetallproductParamDto} from './products.dto';
import ProductsRepo from './products.repo';
@Injectable()
export class ProductsService {
    constructor(
        private readonly ProductsRepo: ProductsRepo){}
    async addproduct(userId:string,body:any): Promise<void> {
      const user=await this.ProductsRepo.addproducts(body,userId);
      return user; 
      }
      
      async getProduct(userId:string): Promise<any[]> {
       
        const  users =
          await this.ProductsRepo.getProducts(userId);
      
        return users;
      }
      async getProductdetail(userId:string,param:GetproductParamDto): Promise<GetproductParamDto> {
        const { id: postId } = param;
       
        const  users =
          await this.ProductsRepo.getproductdetail(userId,parseInt(postId));
    
        return users;
      }
      async getuserallProductdetail(param:GetallproductParamDto): Promise<GetallproductParamDto> {
        const { userId: userId } = param;
        const  users =
          await this.ProductsRepo.getuserallproductdetail(parseInt(userId));
      
        return users;
      }
      async updateproduct(userId:string,body:any,id:any): Promise<void> {
        
        const user=await this.ProductsRepo.updateproducts(userId,body,id);
        return user; 
        }
        async deleteproduct(id:any): Promise<void> {
        
          const user=await this.ProductsRepo.deleteproducts(id);
          return user; 
          }
}
