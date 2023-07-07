import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CrearAdComponent } from './components/superU/crear-ad/crear-ad.component';
import { ListaAdComponent } from './components/superU/lista-ad/lista-ad.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


import { TableModule } from 'primeng/table';
import { ToastrModule } from 'ngx-toastr';
import { MegaMenuModule } from 'primeng/megamenu';
import { SpinerComponent } from './components/compartido/spiner/spiner.component';
import { MenuComponent } from './components/compartido/menu/menu.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';
import { HomeComponent } from './components/compartido/home/home.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { ListMateriasComponent } from './components/materias/list-materias/list-materias.component';
import { NewMateriaComponent } from './components/materias/new-materia/new-materia.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearAdComponent,
    ListaAdComponent,
    SpinerComponent,
    MenuComponent,
    HomeComponent,
    ListMateriasComponent,
    NewMateriaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastModule,
    MegaMenuModule,
    TabMenuModule,
    MenubarModule,
    TableModule,

    ToastrModule.forRoot(),
  ],
  providers: [
  {provide:HTTP_INTERCEPTORS,useClass:AddTokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
