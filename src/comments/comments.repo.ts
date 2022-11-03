import { Injectable } from '@nestjs/common';
import { gql } from 'graphql-request';
import { HasuraService } from '../service/hasura.service';
import { Comment } from './comments.dto';


const commentFragment = gql`
  fragment comment on comments {
    id
    postId
   userId
   name
   email
   body  
  }
`;


@Injectable()
export default class CommentsRepo {
 constructor(private readonly client:HasuraService){}
    getCommentQuery(): string {
        const query = gql`
        query{
            comments{
              ...comment
               
            }
        }
          ${commentFragment}
        `;
        return query;
      }


      addCommentQuery(): string {
        const query = gql`
        mutation($body: comments_insert_input!){
         insert_comments_one(object: $body)
               { 
              userId,
              postId,
              name,
              email,
            body,
               
            }
        }
          ${commentFragment}
        `;
        return query;
      }
      updateCommentQuery(): string {
        const query = gql`
        mutation ($id: Int!, $updates:comments_set_input!) {
          update_comments_by_pk(pk_columns: { id: $id }, _set: $updates) {
          ...comment
          }
        }
          ${commentFragment}
        `;
        return query;
      }

      async addcomments(body:any):Promise<any>{
        const commentquery=this.addCommentQuery();
    
    type result = [
        {
          data: { comment: Comment[] };
        },
        
      ];
      const newcomments = await this.client.batchRequests<result>([
        {
          document: commentquery,
          variables: {body},
        },
        
      ]);
   
    return newcomments;
   }  
   async updatecomments(body:any,id:any):Promise<any>{
   
    const commentquery= gql`
    mutation ($id: Int!, $body:comments_set_input!) {
      update_comments_by_pk(pk_columns: { id: $id }, _set: $body) {
        userId
    postId
    name
    email
    body
      }
    }
    `;

type result = [
    {
      data: { comment: Comment[] };
    },
    
  ];
  const newcomments = await this.client.batchRequests<result>([
    {
      document: commentquery,
      variables: {body,id},
      
    },
    
  ]);

return newcomments;
}  

   async getComments():Promise<any>{
    const commentQuery = this.getCommentQuery();
    
    type result = [
        {
          data: { comments: Comment[] };
        },
        
      ];
    
      const comments= await this.client.batchRequests<result>([
        {
          document: commentQuery,
          variables: {},
        },
        
      ]);
   
    return comments;
   }  
   async getcommentdetail(commentId:number):Promise<any>{
    const query = gql`
    query getCommentsById($commentId: Int!) {
        comments_by_pk(id: $commentId) {
       ...comment
        }
      }
      ${commentFragment}
    `;
    
    type result = [
        {
        data: { comments: Comment[] };
        },
        
    ];
    
    const posts= await this.client.batchRequests<result>([
        {
        document: query,
        variables: {commentId},
        },
        
    ]);

    return posts;
}  

async getuserallcommentdetail(userId:number):Promise<any>{
    const query = gql`
    query getComment($userId: Int) {
        comments(
          where: {
            _and: [{ userId: { _eq: $userId } }]
          }
        ) {
         
          id
          postId
          userId
          name
          email
          body
        }
      }
    
    `;
    
    type result = [
        {
        data: { comments: Comment[] };
        },
        
    ];
    
    const comments= await this.client.batchRequests<result>([
        {
        document: query,
        variables: {userId},
        },
        
    ]);

    return comments;
}  
async getpostallcommentdetail(postId:number):Promise<any>{
  const query = gql`
  query getComment($postId: Int) {
      comments(
        where: {
          _and: [{ postId: { _eq: $postId } }]
        }
      ) {
       
        id
        postId
        userId
        name
        email
        body
      }
    }
  
  `;
  
  type result = [
      {
      data: { comments: Comment[] };
      },
      
  ];
  
  const comments= await this.client.batchRequests<result>([
      {
      document: query,
      variables: {postId},
      },
      
  ]);

  return comments;
}  
async deletecomments(id:any):Promise<any>{
   
  const commentquery= gql`
  mutation ($id: Int!) {
    delete_comments_by_pk(id:$id){
      userId
      postId
      email
      name
      body
    }
    }
  `;

type result = [
  {
    data: { comment: Comment[] };
  },
  
];
const newcomments = await this.client.batchRequests<result>([
  {
    document: commentquery,
    variables: {id},
    
  },
  
]);

return newcomments;
}  


}
