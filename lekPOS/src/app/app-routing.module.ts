import { StockHomeComponent } from './components/stock/stock-home/stock-home.component';
import { RegisterComponent } from './components/authen/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authen/login/login.component';
import { StockCreateComponent } from './components/stock/stock-create/stock-create.component';
import { StockEditComponent } from './components/stock/stock-edit/stock-edit.component';
import { ShopHomeComponent } from './components/shop/shop-home/shop-home.component';
import { AuthenGuard } from './services/authen.guard';
import { CheckCancelFormGuard } from './services/check-cancel-form.guard';


const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stock', component: StockHomeComponent, canActivate: [AuthenGuard] },
  { path: 'stock/create', component: StockCreateComponent, canActivate: [AuthenGuard], canDeactivate: [CheckCancelFormGuard] },
  { path: 'stock/edit/:id', component: StockEditComponent, canActivate: [AuthenGuard], canDeactivate: [CheckCancelFormGuard]  },
  { path: 'shop', component: ShopHomeComponent, canActivate: [AuthenGuard] },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
