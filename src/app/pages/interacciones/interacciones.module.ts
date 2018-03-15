import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HubInterceptor } from "../../common/interceptor/hub.interceptor";
import { ComunModule } from "../../common/comun.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DataTablesModule } from "angular-datatables";
import { InteraccionesRoutingModule } from "./interacciones-routing.module";
import { MaterialModule } from "../../material/material.module";

import { HttpService } from "../../services/http.service";
import { ExcelService } from "../../services/excel.service";

import { InteraccionesComponent } from "./interacciones.component";
import { InteraccionComponent } from "./interaccion/interaccion.component";
import { CrearComponent } from "./interaccion/crear-editar/crear.component";
import { EditarComponent } from "./interaccion/crear-editar/editar.component";
@NgModule({
  imports: [
    CommonModule,
    InteraccionesRoutingModule,
    ComunModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  declarations: [
    InteraccionesComponent,
    InteraccionComponent,
    CrearComponent,
    EditarComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HubInterceptor,
      multi: true
    },
    HttpService,
    ExcelService
  ]
})
export class InteraccionesModule {}
