import { BadRequestException, Body, Injectable,UnauthorizedException } from '@nestjs/common';
import { GetUserParamDto,LoginDto } from './users.dto';

import{AuthService as AuthService1, IGetTokens} from '../shared/auth/auth.service';
import UsersRepo from './users.repo';

@Injectable()
export class UsersService {
    constructor(
        private readonly UsersRepo: UsersRepo,
        private readonly AuthService: AuthService1,
      
        ){}
     async adduser(body:any): Promise<void> {
     
      const password=await this.AuthService.hashPassword(body.password)
      body.password=password;
      if(!body.role) {
        throw new BadRequestException(
          `Sorry, we could not find an role. Check for typos and try again`,
        );
      
      }
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
          async login(creds: LoginDto) {
            const users = await this.UsersRepo.getUser(creds.email, creds.role);
            const [user] = users;
            if (!user) {
              throw new UnauthorizedException(
                `Sorry, we could not find an account with this email address. Check for typos and try again`,
              );
            }
            if (!this.AuthService.compareHash(creds.password, user.password)) {
              const message =
                'Sorry, the password that you entered is incorrect. Please try again';
              throw new UnauthorizedException(message);
            }
            const getToken : IGetTokens={
              id: user.id,
              role: user.role
            }
           
             const tokens = await this.AuthService.getTokens(getToken);
            
            const [onboarding] = await Promise.all([
              this.UsersRepo.updateUserById(user.id, 
               tokens.refresh_token,
              ),
              //this.UsersRepo.getOnboardingByUserId(user.id),
            ]);
            return { ...tokens, id: user.id,onboarding};
           }
           
}
