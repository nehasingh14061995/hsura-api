import { Injectable } from '@nestjs/common';
import { gql } from 'graphql-request';
import { HasuraService } from '../service/hasura.service';
import { Post } from './posts.dto';


const postFragment = gql`
  fragment post on posts {
    id
   userId
   title
   body  
  }
`;


@Injectable()
export default class PostsRepo {
 constructor(private readonly client:HasuraService){}
    getPostQuery(): string {
        const query = gql`
        query($userId: Int!){
            users(where: {id: {_eq: $userId}}) {
              posts{

                id 
                userId
                title
                body
              }
            }
        }
         
        `;
        return query;
      }


      addPostQuery(): string {
        const query = gql`
        mutation($input: posts_insert_input!){
         insert_posts_one(object: $input)
               { 
             userId,
            title,
            body,
               
            }
        }
          ${postFragment}
        `;
        return query;
      }

      async addposts(body:any,userId:string,):Promise<any>{
        const postsquery=this.addPostQuery();
    
    type result = [
        {
          data: { post: Post[] };
        },
        
      ];
      const input ={userId, ...body}
      const newposts = await this.client.batchRequests<result>([
        {
          document: postsquery,
          variables: {input},
        },
        
      ]);
   
    return newposts;
   }  

   async getPosts(userId:string):Promise<any>{
    const postQuery = this.getPostQuery();
    
    type result = [
        {
          data: { posts: Post[] };
        },
        
      ];
    
      const posts= await this.client.batchRequests<result>([
        {
          document: postQuery,
          variables: {userId},
        },
        
      ]);
   
    return posts;
   }  
   async getpostdetail(userId:string,postId:number):Promise<any>{
    const query = gql`
    query getPostsById($userId:Int!,$postId: Int!) {
      users(where:{id:{_eq:$userId}}){
           posts(where:{id:{_eq: $postId}}) {
        ...post
           }
         }
     }
      ${postFragment}
    `;
    
    type result = [
        {
        data: { posts: Post[] };
        },
        
    ];
    
    const posts= await this.client.batchRequests<result>([
        {
        document: query,
        variables: {userId,postId},
        },
        
    ]);

    return posts;
}  

async getuserallpostdetail(userId:number):Promise<any>{
    const query = gql`
    query getPost($userId: Int) {
        posts(
          where: {
            _and: [{ userId: { _eq: $userId } }]
          }
        ) {
         
          id
          userId
          title
          body
        }
      }
    
    `;
    
    type result = [
        {
        data: { posts: Post[] };
        },
        
    ];
    
    const posts= await this.client.batchRequests<result>([
        {
        document: query,
        variables: {userId},
        },
        
    ]);

    return posts;
}  
async updateposts(userId:string,body:any,id:any):Promise<any>{
   
  const postquery= gql`
  mutation ($id: Int!, $input:posts_set_input!) {
    update_posts_by_pk(pk_columns: { id: $id }, _set: $input) {
      userId
      title
  body
    }
  }
  `;

type result = [
  {
    data: { posts: Post[] };
  },
  
];
const input={userId,...body}
const newposts = await this.client.batchRequests<result>([
  {
    document: postquery,
    variables: {input,id},
    
  },
  
]);

return newposts;
}  

async deleteposts(id:any):Promise<any>{
   
  const postquery= gql`
  mutation ($id: Int!) {
    delete_posts_by_pk(id:$id){
      userId
     title
      body
    }
    }
  `;

type result = [
  {
    data: { post: Post[] };
  },
  
];
const newposts = await this.client.batchRequests<result>([
  {
    document: postquery,
    variables: {id},
    
  },
  
]);

return newposts;
}  


}
