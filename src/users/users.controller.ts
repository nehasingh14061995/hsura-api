import { Controller, Post,Body, Get, Param } from '@nestjs/common';
import { AddUsersDto,GetUserParamDto } from './users.dto';
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
}


