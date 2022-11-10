import { Controller,Post,Body, Get,Param, Put, Delete, UseGuards} from '@nestjs/common';
import { AddProductsDto ,GetproductParamDto,GetallproductParamDto,UpdateProductssDto} from './products.dto';
import { ProductsService } from './products.service';
import { User, UserRoles } from '../users/users.dto';

import { Roles } from '../shared/decorators/roles.decorator';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RolesGuard } from '../shared/guards/role.guard';
import{ GetUser} from'../shared/decorators/get.user.decorator';


@Controller('products')
export class ProductsController {
    constructor(private readonly productservice: ProductsService,
      ){}

@Post('/create')
@UseGuards(AuthGuard, RolesGuard)
@Roles("user")
async addposts( @GetUser() user: User,@Body() body: AddProductsDto): Promise<void> {
 
    return this.productservice.addproduct(user.id,body);
  }


  @Get('/allproducts') 
   @UseGuards(AuthGuard, RolesGuard)
  @Roles("user")
  async getposts( @GetUser() user: User){
   
    return this.productservice.getProduct(user.id); 
  }

  @Get('/products-detail/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("user")
  async getuserdetail(@GetUser() user: User,@Param() param:GetproductParamDto): Promise<GetproductParamDto>{
    
    return this.productservice.getProductdetail(user.id,param); 
  }
  @Get('/users-allproduct/:userId')
  async getuserpostdetail(@Param() param:GetallproductParamDto): Promise<GetallproductParamDto>{
    return this.productservice.getuserallProductdetail(param); 
  }
  @Put('/update/product/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("user")
  async updateComment(@GetUser() user: User,@Param('id') id:string,@Body() body: UpdateProductssDto) {
    return this.productservice.updateproduct(user.id,body,parseInt(id));
  }
  @Delete('/delete/product/:id')
  async deleteComment(@Param('id') id:string) {
    return this.productservice.deleteproduct(parseInt(id));
  }
}
