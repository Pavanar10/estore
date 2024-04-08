import { Product } from "./product.type";

export interface CartItem{
    product:Product,
    quantity:number,
    amount:number
}

export interface Cart{
    products:CartItem[],
    totalAmount:number,
    totalProducts:number
}

export interface DeliveryAddress{
    userName:string,
    address:string,
    state:string,
    pin:string,
    city:string
}