import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CrearAdComponent } from './components/superU/crear-ad/crear-ad.component';
import { HomeComponent } from './components/compartido/home/home.component';
import { ListaAdComponent } from './components/superU/lista-ad/lista-ad.component';
import { authGuard } from './utils/auth.guard';
import { ListMateriasComponent } from './components/materias/list-materias/list-materias.component';
import { NewMateriaComponent } from './components/materias/new-materia/new-materia.component';



const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'crear', component: CrearAdComponent,canActivate:[authGuard]
  },
  {
    path: 'home', component: HomeComponent,canActivate:[authGuard]
  },
  {
    path: 'listaUsers', component: ListaAdComponent,canActivate:[authGuard]
  },
  {
    path:'editar/:cedula', component: CrearAdComponent,canActivate:[authGuard]
  },
  {
    path:'editarMateria/:id', component: NewMateriaComponent,canActivate:[authGuard]
  },
  {
    path:'ListaMaterias', component: ListMateriasComponent, canActivate:[authGuard]
  },
  {
path:'nuevaMateria', component: NewMateriaComponent, canActivate:[authGuard]
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
