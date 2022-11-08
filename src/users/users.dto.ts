import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum
} from 'class-validator';

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
}
export class User {
  id?: string;
  name: string;
  username: string;
  email?: string;
  password:string;
  role:string;
  refresh_token: string;
 
}


export class GetUserParamDto {
   
    id: string;
  }

export class AddUsersDto {
    
    name: string;
  
    username: string;
    role:string;
    email: string;
    password:string;
    refresh_token: string;
  }
  export class UpdateusersDto {
    id:string;
    userId: number;
    postId:number;
    name: string;
    email: string;
    body:string;
    role:string;
    password:string;
    refresh_token: string;

   
  }
  export class LoginDto {
    @IsString()
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    @IsEnum(UserRoles)
    role: string;
    
  }
  