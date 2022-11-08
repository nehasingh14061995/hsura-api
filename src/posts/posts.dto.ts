

export class Post {
  id?: number;
  userId: number;
  title: string;
  body?: string;
 
}

export class GetpostParamDto{
    id:string;
}
export class GetallpostParamDto{
    userId:string;
}
export class AddPostsDto {
    
   
  
    title: string;
  
    body: string;
  }
  export class UpdatePostssDto {
    title: string;
  
    body: string;

   
  }