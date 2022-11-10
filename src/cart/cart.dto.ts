

export class Cart {
    id?: number;
    userId: number;
    quantity: number;
    productId?: number;
    total_price:number;
    price:number;
   
  }
  
  export class GetcartParamDto{
      id:string;
  }
  export class GetallcartParamDto{
      userId:string;
  }
  export class AddcartDto {
    quantity: number;
    productId?: number;
    price:number;
    }
    export class UpdatecartDto {
        quantity: number;
        productId?: number;
        total_price:number;
        price:number;
  
     
    }