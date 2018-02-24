// import { platformCoreDynamic } from '@angular/compiler';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { CdkTableModule } from '@angular/cdk/table';
import { AppRoutingModule } from './app-routing.module';
import { ComunModule } from './common/comun.module'
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";


import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthGuard } from './common/guard/auth.guard';
import { RoleGuard } from "./common/guard/role.guard";

import { HttpService } from './services/http.service';



// import { AdicionarComponent } from './pages/usuarios/adicionar/adicionar.component';
// import { EditarComponent } from './pages/usuarios/editar/editar.component';


@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComunModule,
  ],
  exports: [CdkTableModule],
  providers: [HttpService, AuthGuard, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}

