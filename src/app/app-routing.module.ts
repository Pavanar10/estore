import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [{
  path:'home',loadChildren:()=>import('./home/home.module').then((m)=>m.HomeModule),
},
{path:'',redirectTo:'/home/products',pathMatch:'full'},
{path:'**',component:NotfoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
