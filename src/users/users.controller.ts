import { Controller, Post,Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AddUsersDto,GetUserParamDto,UpdateusersDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userservice: UsersService){}

@Post('/create')
async addusers(@Body() body: AddUsersDto): Promise<void> {
    return this.userservice.adduser(body);
  }


  @Get('/allusers')
  async getusers(){
    return this.userservice.getUser(); 
  }
  @Get('/users-detail/:id')
  async getuserdetail(@Param() param:GetUserParamDto): Promise<GetUserParamDto>{
    return this.userservice.getUserdetail(param); 
  }
  @Put('/update/user/:id')
  async updateComment(@Param('id') id:string,@Body() body: UpdateusersDto) {
    return this.userservice.updateuser(body,parseInt(id));
  }
  @Delete('/delete/user/:id')
  async deleteComment(@Param('id') id:string) {
    return this.userservice.deleteuser(parseInt(id));
  }
}


