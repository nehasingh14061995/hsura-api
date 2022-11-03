import { Body, Injectable } from '@nestjs/common';
import { GetUserParamDto } from './users.dto';

import UsersRepo from './users.repo';

@Injectable()
export class UsersService {
    constructor(
        private readonly UsersRepo: UsersRepo){}
    async adduser(body:any): Promise<void> {
      const user=await this.UsersRepo.addusers(body);
      return user; 
      }

      async getUser(): Promise<any[]> {
        const  users =
          await this.UsersRepo.getusers();
      
        return users;
      }
      async getUserdetail(param:GetUserParamDto): Promise<GetUserParamDto> {
        const { id: userId } = param;
        const  users =
          await this.UsersRepo.getusersdetail(parseInt(userId));
      
        return users;
      }
      async updateuser(body:any,id:any): Promise<void> {
        
        const user=await this.UsersRepo.updateusers(body,id);
        return user; 
        }
        async deleteuser(id:any): Promise<void> {
        
          const user=await this.UsersRepo.deleteusers(id);
          return user; 
          }
}
