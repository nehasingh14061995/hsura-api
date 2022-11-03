

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
    
    userId: number;
  
    title: string;
  
    body: string;
  }
  export class UpdatePostssDto {
    id:number;
    userId: number;
    postId:number;
    name: string;
    email: string;
    body:string;

   
  }