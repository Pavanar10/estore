import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { SidenavigationComponent } from './components/sidenavigation/sidenavigation.component';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from '../shared/shared.module';
import { RattingsComponent } from '../shared/components/rattings/rattings.component';
import {HttpClientModule} from '@angular/common/http';
import { CategoryService } from './services/category/category.service';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductStoreItem } from './services/products/products.storeItem';
import { ProductsService } from './services/products/products.service';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { ProductsGalleryComponent } from './components/products-gallery/products-gallery.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStoreItem } from './services/cart/cart.storeItem';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSignupComponent } from './components/users/user-signup/user-signup.component';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { UserService } from './services/users/user-service.service';
import { OrderService } from './services/order/order.service';
import { PastordersComponent } from './components/pastorders/pastorders.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CatnavigationComponent,
    SidenavigationComponent,
    ProductsComponent,
    ProductsGalleryComponent,
    ProductDetailsComponent,
    CartComponent,
    UserSignupComponent,
    UserLoginComponent,
    PastordersComponent,

  ],
  imports: [
    CommonModule,
    FontAwesomeModule,SharedModule,HttpClientModule,
    RouterModule,HomeRoutingModule,ReactiveFormsModule,FormsModule

  ],
  providers:[CategoryService,CategoriesStoreItem,ProductStoreItem,ProductsService,CartStoreItem,UserService,OrderService]
})
export class HomeModule { }
