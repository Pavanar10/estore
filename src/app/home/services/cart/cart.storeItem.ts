import { StoreItem } from "src/app/shared/storeItem";
import { Observable, race } from "rxjs";
import { Cart,CartItem } from "../../types/cart.type";
import { Product } from "../../types/product.type";

export class CartStoreItem extends StoreItem<Cart>{

    constructor(){
        const storedCart:any=sessionStorage.getItem('cart');
        if(storedCart){
            super(JSON.parse(storedCart));
        }else
        super({
            products:[],
            totalAmount:0,
            totalProducts:0
        })
    
    }
    
    get cart$():Observable<Cart>{
        return this.value$
    }
    get cart():Cart{
        return this.value
    }

    addProducts(product:Product):void{
        const cartProduct:CartItem|undefined= this.cart.products.find((c)=>c?.product.id===product.id);
        console.log(cartProduct)
        if(!cartProduct){
            this.cart.products=[
                ...this.cart.products,{
                    product:product,
                    amount:Number(product.price),
                    quantity:1,
                }
            ];
        }else{
            cartProduct.quantity++;
            cartProduct.amount+=Number(product.price)
        }
        this.cart.totalAmount+=Number(product.price);
        ++this.cart.totalProducts;
        this.saveCart();
    }



    removeProduct(cartItem:CartItem):void{
        this.cart.products = this.cart.products.filter((item)=>
            item.product.id !==cartItem.product.id
        )
        this.cart.totalAmount-=cartItem.amount;
        this.cart.totalProducts-=cartItem.quantity;
        if(this.cart.totalProducts===0){
            sessionStorage.clear();
        }else{
            this.saveCart();
        }

    }



    decreaseProductQuantity(cartItem: CartItem): void {
        const cartProduct: CartItem | undefined = this.cart.products.find(
          (cartProduct) => cartProduct.product.id === cartItem.product.id
        );
        if (cartProduct) {
          if (cartProduct.quantity === 1) {
            this.removeProduct(cartItem);
          } else {
            cartProduct.quantity--;
            this.cart.totalAmount -= Number(cartItem.product.price);
            --this.cart.totalProducts;
            this.saveCart();
          }
        }
        
      }


      saveCart():void{
        sessionStorage.clear();
        sessionStorage.setItem('cart',JSON.stringify(this.cart));
      }

      clearCart():void{
        sessionStorage.clear();
        this.cart.products=[];
        this.cart.totalAmount=0;
        this.cart.totalProducts=0;
      }
}