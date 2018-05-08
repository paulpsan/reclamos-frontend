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
import { ReporteComponent } from "./reporte/reporte.component";
import { ChartsModule } from "ng2-charts";
import { BarComponent } from "./reporte/charts/bar.component";
import { PieComponent } from "./reporte/charts/pie.component";
@NgModule({
  imports: [
    CommonModule,
    InteraccionesRoutingModule,
    ComunModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ChartsModule
  ],
  declarations: [
    InteraccionesComponent,
    ReporteComponent,
    BarComponent,
    PieComponent
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
