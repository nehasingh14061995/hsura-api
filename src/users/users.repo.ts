import { Injectable } from '@nestjs/common';
import { gql } from 'graphql-request';
import { HasuraService } from '../service/hasura.service';
import { User,UpdateusersDto} from './users.dto';

export interface OnboardingsByPk {
  userId: string;
  id: string;
  name: string;
  
}
const userFragment = gql`
  fragment user on users {
    id
   name
   username
   email  
   password
   role
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
            password,
            role
               
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
    async updateusers(body:any,id:any):Promise<any>{
   
      const userquery= gql`
      mutation ($id: Int!, $body:users_set_input!) {
        update_users_by_pk(pk_columns: { id: $id }, _set: $body) {
          name
          username
          email
          password
          role
        }
      }
      `;
    
    type result = [
      {
        data: { users: User[] };
      },
      
    ];
    const newusers = await this.client.batchRequests<result>([
      {
        document: userquery,
        variables: {body,id},
        
      },
      
    ]);
    
    return newusers;
    }  
    
    async deleteusers(id:any):Promise<any>{
       
      const userquery= gql`
      mutation ($id: Int!) {
        delete_users_by_pk(id:$id){
          name
          username
          email
          password
        }
        }
      `;
    
    type result = [
      {
        data: { user: User[] };
      },
      
    ];
    const newusers = await this.client.batchRequests<result>([
      {
        document: userquery,
        variables: {id},
        
      },
      
    ]);
    
    return newusers;
    }  
    
    async getUser(email: string, role: string) {
      const query = gql`
        query getUser($email: String, $role: String) {
          users(
            where: {
              _and: [{ email: { _eq: $email } }, { role: { _eq: $role } }]
            }
          ) {
            ...user
            id
          }
        }
        ${userFragment}
      `;
      const users = await this.getUsers(query, { email, role });
      return users;
    }
    private async getUsers(query: string, variables = {}) {
      const { users } = await this.client.request<{ users: User[] }>(
        query,
        variables,
      );
      return users;
    }

    async updateUserById(id: string, refresh_token: string) {
      const updates= {
        refresh_token: refresh_token
      }
      const mutation = gql`
        mutation updateUsersById($id: Int!, $updates: users_set_input) {
          update_users_by_pk(pk_columns: { id: $id }, _set: $updates) {
            id
            refresh_token
          }
        }
        ${userFragment}
      `;
      return this.client.request<{ update_users_by_pk: User[] }>(mutation, {
        id,
        updates,
      });
    }
    async getOnboardingByUserId(userId: string) {
      const query = gql`
        query ($userId: Int!) {
          onboardings_by_pk(userId: $userId) {
            screen
            is_completed
          }
        }
      `;
      const { onboardings_by_pk } = await this.client.request<{
        onboardings_by_pk: OnboardingsByPk;
      }>(query, { userId });
      return onboardings_by_pk;
    }
    }
