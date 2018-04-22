import { ConsultasComponent } from "./consultas.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CrearComponent } from "./crear-editar/crear.component";
import { EditarComponent } from "./crear-editar/editar.component";
import { RoleGuard } from "../../common/guard/role.guard";
import { DetalleComponent } from "./detalle/detalle.component";

const routes: Routes = [
  {
    path: "",
    component: ConsultasComponent,
    children: []
  },
  {
    path: "adicionar",
    component: CrearComponent
  },

  { path: "editar/:id", component: EditarComponent },
  {
    path: "detalle/:id",
    component: DetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule {}
