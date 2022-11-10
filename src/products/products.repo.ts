import { Injectable } from '@nestjs/common';
import { gql } from 'graphql-request';
import { HasuraService } from '../service/hasura.service';
import { Product } from './products.dto';


const productFragment = gql`
  fragment product on products {
    id
   userId
   name
   price
   category  
  }
`;


@Injectable()
export default class ProductsRepo {
 constructor(private readonly client:HasuraService){}
    getProductQuery(): string {
        const query = gql`
        query($userId: Int!){
            users(where: {id: {_eq: $userId}}) {
              product{
                id 
                userId
                name
                price
                category
              }
            }
        }
         
        `;
        return query;
      }


      addProductQuery(): string {
        const query = gql`
        mutation($input: products_insert_input!){
         insert_products_one(object: $input)
               { 
             userId,
            name,
            price,
            category
               
            }
        }
          ${productFragment}
        `;
        return query;
      }

      async addproducts(body:any,userId:string,):Promise<any>{
        const productsquery=this.addProductQuery();
    
    type result = [
        {
          data: { product: Product[] };
        },
        
      ];
      const input ={userId, ...body}
      const newproducts = await this.client.batchRequests<result>([
        {
          document: productsquery,
          variables: {input},
        },
        
      ]);
   
    return newproducts;
   }  

   async getProducts(userId:string):Promise<any>{
    const productQuery = this.getProductQuery();
    
    type result = [
        {
          data: { products: Product[] };
        },
        
      ];
    
      const products= await this.client.batchRequests<result>([
        {
          document: productQuery,
          variables: {userId},
        },
        
      ]);
   
    return products;
   }  
   async getproductdetail(userId:string,productId:number):Promise<any>{
    const query = gql`
    query getProductsById($userId:Int!,$productId: Int!) {
      users(where:{id:{_eq:$userId}}){
           product(where:{id:{_eq: $productId}}) {
        ...product
           }
         }
     }
      ${productFragment}
    `;
    
    type result = [
        {
        data: { products: Product[] };
        },
        
    ];
    
    const products= await this.client.batchRequests<result>([
        {
        document: query,
        variables: {userId,productId},
        },
        
    ]);

    return products;
}  

async getuserallproductdetail(userId:number):Promise<any>{
    const query = gql`
    query getProduct($userId: Int) {
        products(
          where: {
            _and: [{ userId: { _eq: $userId } }]
          }
        ) {
         
          id
          userId
          name
          category
          price
        }
      }
    
    `;
    
    type result = [
        {
        data: { products: Product[] };
        },
        
    ];
    
    const products= await this.client.batchRequests<result>([
        {
        document: query,
        variables: {userId},
        },
        
    ]);

    return products;
}  
async updateproducts(userId:string,body:any,id:any):Promise<any>{
   
  const productquery= gql`
  mutation ($id: Int!, $input:products_set_input!) {
    update_products_by_pk(pk_columns: { id: $id }, _set: $input) {
      userId
      name
  category
  price
    }
  }
  `;

type result = [
  {
    data: { products: Product[] };
  },
  
];
const input={userId,...body}
const newproducts = await this.client.batchRequests<result>([
  {
    document: productquery,
    variables: {input,id},
    
  },
  
]);

return newproducts;
}  

async deleteproducts(id:any):Promise<any>{
   
  const productquery= gql`
  mutation ($id: Int!) {
    delete_products_by_pk(id:$id){
      userId
     name
      category
      price
    }
    }
  `;

type result = [
  {
    data: { product: Product[] };
  },
  
];
const newproducts = await this.client.batchRequests<result>([
  {
    document: productquery,
    variables: {id},
    
  },
  
]);

return newproducts;
}  


}
