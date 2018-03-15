import { ComunModule } from './../../common/comun.module';
import { HeaderComponent } from '../../common/components/header/header.component';
import { HubInterceptor } from '../../common/interceptor/hub.interceptor';
import { MaterialModule } from '../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from '../../services/http.service';

import { InstanciasComponent, ModalEliminarInstancia } from './instancias.component';
import { InstanciasRoutingModule } from './instancias-routing.module';
import { EditarComponent } from './crear-editar/editar.component';
import { CrearComponent } from './crear-editar/crear.component';

@NgModule({
  declarations: [
    InstanciasComponent,
    EditarComponent,
    CrearComponent,
    ModalEliminarInstancia,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InstanciasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComunModule
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HubInterceptor,
      multi: true
    },
    HttpService
  ],
  entryComponents: [ModalEliminarInstancia]
})
export class InstanciasModule {}
