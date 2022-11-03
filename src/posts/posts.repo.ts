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
        query{
            posts{
              ...post
               
            }
        }
          ${postFragment}
        `;
        return query;
      }


      addPostQuery(): string {
        const query = gql`
        mutation($body: posts_insert_input!){
         insert_posts_one(object: $body)
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

      async addposts(body:any):Promise<any>{
        const postsquery=this.addPostQuery();
    
    type result = [
        {
          data: { post: Post[] };
        },
        
      ];
      const newposts = await this.client.batchRequests<result>([
        {
          document: postsquery,
          variables: {body},
        },
        
      ]);
   
    return newposts;
   }  

   async getPosts():Promise<any>{
    const postQuery = this.getPostQuery();
    
    type result = [
        {
          data: { posts: Post[] };
        },
        
      ];
    
      const posts= await this.client.batchRequests<result>([
        {
          document: postQuery,
          variables: {},
        },
        
      ]);
   
    return posts;
   }  
   async getpostdetail(postId:number):Promise<any>{
    const query = gql`
    query getPostsById($postId: Int!) {
        posts_by_pk(id: $postId) {
       ...post
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
        variables: {postId},
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
async updateposts(body:any,id:any):Promise<any>{
   
  const postquery= gql`
  mutation ($id: Int!, $body:posts_set_input!) {
    update_posts_by_pk(pk_columns: { id: $id }, _set: $body) {
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
const newposts = await this.client.batchRequests<result>([
  {
    document: postquery,
    variables: {body,id},
    
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
