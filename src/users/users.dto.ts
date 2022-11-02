

export class User {
  id?: number;
  name: string;
  username: string;
  email?: string;
 
}


export class GetUserParamDto {
   
    id: string;
  }

export class AddUsersDto {
    
    name: string;
  
    username: string;
  
    email: string;
  }