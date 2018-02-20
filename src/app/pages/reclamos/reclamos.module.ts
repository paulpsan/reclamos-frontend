import { HubInterceptor } from '../../common/interceptor/hub.interceptor';
import { MaterialModule } from '../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { ReclamosComponent, ModalEliminarReclamo } from './reclamos.component';
import { ReclamosRoutingModule } from './reclamos-routing.module';
import { HeaderComponent } from '../../common/components/header/header.component';
import { ComunModule } from '../../common/comun.module';
import { EditarComponent } from './crear-editar/editar.component';
import { CrearComponent } from './crear-editar/crear.component';


@NgModule({
  declarations: [
    ReclamosComponent,
    EditarComponent,
    CrearComponent,
    ModalEliminarReclamo
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReclamosRoutingModule,
    ComunModule,
    DataTablesModule
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
  entryComponents: [ModalEliminarReclamo]
})
export class ReclamosModule {}
