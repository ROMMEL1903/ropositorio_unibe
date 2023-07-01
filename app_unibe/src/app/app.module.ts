import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CrearAdComponent } from './components/superU/crear-ad/crear-ad.component';
import { ListaAdComponent } from './components/superU/lista-ad/lista-ad.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearAdComponent,
    ListaAdComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
