

export class Comment {
    id?: number;
    userId: number;
    postId:number;
    name: string;
    email?: string;
    body:string;
   
  }
  
  export class GetcommentParamDto{
    id:string;
}
export class GetallcommentParamDto{
    userId:string;
}
  
  export class AddCommentsDto {
      
      userId: number;
    
      postId:number;
      name: string;
      email: string;
      body:string;
     
     
    }