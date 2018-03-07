import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InteraccionesComponent } from "./interacciones.component";
import { ComunModule } from "../../common/comun.module";
import { MaterialModule } from "../../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { InteraccionesRoutingModule } from "./interacciones-routing.module";
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
  ]
})
export class InteraccionesModule {}
