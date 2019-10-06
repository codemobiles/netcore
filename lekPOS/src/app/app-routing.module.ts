import { StockHomeComponent } from './components/stock/stock-home/stock-home.component';
import { RegisterComponent } from './components/authen/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authen/login/login.component';
import { StockCreateComponent } from './components/stock/stock-create/stock-create.component';
import { StockEditComponent } from './components/stock/stock-edit/stock-edit.component';


const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stock', component: StockHomeComponent },
  { path: 'stock/create', component: StockCreateComponent },
  { path: 'stock/edit/:id', component: StockEditComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
