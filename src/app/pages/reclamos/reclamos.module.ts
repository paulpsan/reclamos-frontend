import { HubInterceptor } from "../../common/interceptor/hub.interceptor";
import { MaterialModule } from "../../material/material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ChartsModule } from "ng2-charts/ng2-charts";

import { HttpService } from "../../services/http.service";
import { ExcelService } from "../../services/excel.service";

import { ReclamosComponent, ModalEliminarReclamo } from "./reclamos.component";
import { ReclamosRoutingModule } from "./reclamos-routing.module";
import { HeaderComponent } from "../../common/components/header/header.component";
import { ComunModule } from "../../common/comun.module";
import { EditarComponent } from "./crear-editar/editar.component";
import { CrearComponent } from "./crear-editar/crear.component";
import { ReporteComponent } from "./reporte/reporte.component";
import { BarComponent } from "./reporte/charts/bar.component";
import { PieComponent } from "./reporte/charts/pie.component";

@NgModule({
  declarations: [
    ReclamosComponent,
    EditarComponent,
    CrearComponent,
    ModalEliminarReclamo,
    ReporteComponent,
    BarComponent,
    PieComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReclamosRoutingModule,
    ComunModule,
    DataTablesModule,
    ChartsModule
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HubInterceptor,
      multi: true
    },
    HttpService,
    ExcelService
  ],
  entryComponents: [ModalEliminarReclamo]
})
export class ReclamosModule {}
