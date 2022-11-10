

export class Product {
    id?: number;
    userId: number;
    name: string;
    price: number;
    category:string;
   
  }
  
  export class GetproductParamDto{
      id:string;
  }
  export class GetallproductParamDto{
      userId:string;
  }
  export class AddProductsDto {
      
     
    
    name: string;
    price: string;
    category:string;
    }
    export class UpdateProductssDto {
        name: string;
        price: string;
        category:string;
  
     
    }