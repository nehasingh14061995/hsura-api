import { Injectable } from '@nestjs/common';
import { gql } from 'graphql-request';
import { HasuraService } from '../service/hasura.service';
import { Cart } from './cart.dto';


const cartFragment = gql`
  fragment cart on carts {
    id
   userId
   productId
   quantity
   price
   total_price  
  }
`;


@Injectable()
export default class CartRepo {
 constructor(private readonly client:HasuraService){}
    getCartQuery(): string {
        const query = gql`
        query($userId: Int!){
            users(where: {id: {_eq: $userId}}) {
              carts{

                id 
                userId
                productId
                price
                quantity
                total_price
              }
            }
        }
         
        `;
        return query;
      }


      addCartQuery(): string {
        const query = gql`
        mutation($input: cart_insert_input!){
         insert_cart_one(object: $input)
               { 
             userId,
             productId
            price
                quantity
                total_price
               
            }
        }
          ${cartFragment}
        `;
        return query;
      }

      async addcart(body:any,userId:string,total_price:number):Promise<any>{
        const cartsquery=this.addCartQuery();
    
    type result = [
        {
          data: { cart: Cart[] };
        },
        
      ];
      const input ={userId,total_price, ...body}
      const newcarts = await this.client.batchRequests<result>([
        {
          document: cartsquery,
          variables: {input},
        },
        
      ]);
   
    return newcarts;
   }  

   async getcarts(userId:string):Promise<any>{
    const cartQuery = this.getCartQuery();
    
    type result = [
        {
          data: { carts: Cart[] };
        },
        
      ];
    
      const carts= await this.client.batchRequests<result>([
        {
          document: cartQuery,
          variables: {userId},
        },
        
      ]);
   
    return carts;
   }  
//    async getpostdetail(userId:string,postId:number):Promise<any>{
//     const query = gql`
//     query getPostsById($userId:Int!,$postId: Int!) {
//       users(where:{id:{_eq:$userId}}){
//            posts(where:{id:{_eq: $postId}}) {
//         ...post
//            }
//          }
//      }
//       ${postFragment}
//     `;
    
//     type result = [
//         {
//         data: { posts: Post[] };
//         },
        
//     ];
    
//     const posts= await this.client.batchRequests<result>([
//         {
//         document: query,
//         variables: {userId,postId},
//         },
        
//     ]);

//     return posts;
// }  

// async getuserallpostdetail(userId:number):Promise<any>{
//     const query = gql`
//     query getPost($userId: Int) {
//         posts(
//           where: {
//             _and: [{ userId: { _eq: $userId } }]
//           }
//         ) {
         
//           id
//           userId
//           title
//           body
//         }
//       }
    
//     `;
    
//     type result = [
//         {
//         data: { posts: Post[] };
//         },
        
//     ];
    
//     const posts= await this.client.batchRequests<result>([
//         {
//         document: query,
//         variables: {userId},
//         },
        
//     ]);

//     return posts;
// }  
// async updateposts(userId:string,body:any,id:any):Promise<any>{
   
//   const postquery= gql`
//   mutation ($id: Int!, $input:posts_set_input!) {
//     update_posts_by_pk(pk_columns: { id: $id }, _set: $input) {
//       userId
//       title
//   body
//     }
//   }
//   `;

// type result = [
//   {
//     data: { posts: Post[] };
//   },
  
// ];
// const input={userId,...body}
// const newposts = await this.client.batchRequests<result>([
//   {
//     document: postquery,
//     variables: {input,id},
    
//   },
  
// ]);

// return newposts;
// }  

// async deleteposts(id:any):Promise<any>{
   
//   const postquery= gql`
//   mutation ($id: Int!) {
//     delete_posts_by_pk(id:$id){
//       userId
//      title
//       body
//     }
//     }
//   `;

// type result = [
//   {
//     data: { post: Post[] };
//   },
  
// ];
// const newposts = await this.client.batchRequests<result>([
//   {
//     document: postquery,
//     variables: {id},
    
//   },
  
// ]);

// return newposts;
// }  


}
