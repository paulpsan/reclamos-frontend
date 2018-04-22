import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ConsultasComponent,
  ModalEliminarConsulta
} from "./consultas.component";
  import { ConsultasRoutingModule } from "./consultas-routing.module";

import { ComunModule } from "./../../common/comun.module";
import { MaterialModule } from "../../material/material.module";
import { EditarComponent } from "./crear-editar/editar.component";
import { CrearComponent } from "./crear-editar/crear.component";
import { DataTablesModule } from "angular-datatables";
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    ComunModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
  declarations: [
    ConsultasComponent,
    EditarComponent,
    CrearComponent,
    ModalEliminarConsulta,
    DetalleComponent
  ],
  entryComponents: [ModalEliminarConsulta]
})
export class ConsultasModule {}
