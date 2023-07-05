import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CrearAdComponent } from './components/superU/crear-ad/crear-ad.component';
import { HomeComponent } from './components/compartido/home/home.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'crear', component: CrearAdComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
