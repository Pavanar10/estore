import { Component,EventEmitter,Output,OnDestroy } from '@angular/core';
import { faSearch ,faUserCircle,faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { SearchKeyword } from '../../types/searchKeywork.type';
import { NavigationEnd,Router  } from '@angular/router';
import { filter } from 'rxjs';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { UserService } from '../../services/users/user-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
faSearch=faSearch;
faUserCircle=faUserCircle;

faShoppingCart =faShoppingCart;
subscription:Subscription=new Subscription();
isAuthentivated:boolean=false;
userName:string='';
@Output()
searchClicked:EventEmitter<SearchKeyword>=new EventEmitter<SearchKeyword>();

displaySearch:boolean=true;
constructor(public categoryStore:CategoriesStoreItem,private router:Router,public cartStore:CartStoreItem,private userService:UserService){

  router.events
  .pipe(filter(event=>event instanceof NavigationEnd))
  .subscribe((event)=>{
    this.displaySearch = (event as NavigationEnd).url==='/home/products'?true:false
  });
  this.subscription.add(userService.isUserAuthenticates$.subscribe((result)=>{
  
    this.isAuthentivated=result;
    console.log("sdasdas",this.isAuthentivated)
  }))

this.subscription.add(userService.loggedInUser$.subscribe((result)=>{
  this.userName=result.firstName;
}))
}

onClickSearch(keyword:string,categoryId:string){
  console.log(keyword,categoryId)
  this.searchClicked.emit({
    categoryId:parseInt(categoryId),
    keyword:keyword
  })
}

navigateToCart():void{
  this.router.navigate(['home/cart']);
}
logout():void{
  this.userService.logout()
}
ngOnDestroy(): void {
    this.subscription.unsubscribe()
}
}
