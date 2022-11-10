import { Controller,Post,Body, Get,Param, Put, Delete, UseGuards} from '@nestjs/common';
import { AddcartDto ,GetcartParamDto,GetallcartParamDto,UpdatecartDto} from './cart.dto';
import { CartService } from './cart.service';
import { User, UserRoles } from '../users/users.dto';

import { Roles } from '../shared/decorators/roles.decorator';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RolesGuard } from '../shared/guards/role.guard';
import{ GetUser} from'../shared/decorators/get.user.decorator';


@Controller('carts')
export class CartController {
    constructor(private readonly CartService: CartService,
      ){}

@Post('/create')
@UseGuards(AuthGuard, RolesGuard)
@Roles("user")
async addcarts( @GetUser() user: User,@Body() body: AddcartDto,total_price:number): Promise<void> {
 
    return this.CartService.addcart(user.id,body,total_price);
  }


  @Get('/allcart') 
   @UseGuards(AuthGuard, RolesGuard)
  @Roles("user")
  async getcarts( @GetUser() user: User){
   
    return this.CartService.getcart(user.id); 
  }

//   @Get('/posts-detail/:id')
//   @UseGuards(AuthGuard, RolesGuard)
//   @Roles("user")
//   async getuserdetail(@GetUser() user: User,@Param() param:GetpostParamDto): Promise<GetpostParamDto>{
    
//     return this.postservice.getPostdetail(user.id,param); 
//   }
//   @Get('/users-allpost/:userId')
//   async getuserpostdetail(@Param() param:GetallpostParamDto): Promise<GetallpostParamDto>{
//     return this.postservice.getuserallPostdetail(param); 
//   }
//   @Put('/update/post/:id')
//   @UseGuards(AuthGuard, RolesGuard)
//   @Roles("user")
//   async updateComment(@GetUser() user: User,@Param('id') id:string,@Body() body: UpdatePostssDto) {
//     return this.postservice.updatepost(user.id,body,parseInt(id));
//   }
//   @Delete('/delete/post/:id')
//   async deleteComment(@Param('id') id:string) {
//     return this.postservice.deletepost(parseInt(id));
//   }
}
