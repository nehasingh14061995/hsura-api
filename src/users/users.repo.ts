import { Injectable } from '@nestjs/common';
import { gql } from 'graphql-request';
import { HasuraService } from '../service/hasura.service';
import { User } from './users.dto';


const userFragment = gql`
  fragment user on users {
    id
   name
   username
   email  
  }
`;


@Injectable()
export default class UsersRepo {
 constructor(private readonly client:HasuraService){}
    getUserQuery(): string {
        const query = gql`
        query{
            users{
              ...user
               
            }
        }
          ${userFragment}
        `;
        return query;
      }


      addUserQuery(): string {
        const query = gql`
        mutation($body: users_insert_input!){
         insert_users_one(object: $body)
               { 
              name,
              email,
            username,
               
            }
        }
          ${userFragment}
        `;
        return query;
      }
     
        async addusers(body:any):Promise<any>{
            const usersquery=this.addUserQuery();
        
        type result = [
            {
            data: { user: User[] };
            },
            
        ];
        const newusers = await this.client.batchRequests<result>([
            {
            document: usersquery,
            variables: {body},
            },
            
        ]);
    
        return newusers;
    }  

    async getusers():Promise<any>{
        const userQuery = this.getUserQuery();
        
        type result = [
            {
            data: { users: User[] };
            },
            
        ];
        
        const users= await this.client.batchRequests<result>([
            {
            document: userQuery,
            variables: {},
            },
            
        ]);
    
        return users;
    }  
    async getusersdetail(userId:number):Promise<any>{
        const query = gql`
        query getUsersById($userId: Int!) {
            users_by_pk(id: $userId) {
           ...user
            }
          }
          ${userFragment}
        `;
        
        type result = [
            {
            data: { users: User[] };
            },
            
        ];
        
        const users= await this.client.batchRequests<result>([
            {
            document: query,
            variables: {userId},
            },
            
        ]);
    
        return users;
    }  

    }