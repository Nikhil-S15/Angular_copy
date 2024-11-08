
export interface Product {
    id?: number;
    title?: string;
    description?: string;
    stock?: string;
    price?: number;
    category?: string;
    rating?: number;
  }
  
  export interface GetProducts{
    limit?: string,
    products?: Product[],
    skip?:string,
    total?: number
  }