import { InteraccionesComponent } from "./interacciones.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { CrearComponent } from "./crear-editar/crear.component";
// import { EditarComponent } from "./crear-editar/editar.component";
import { RoleGuard } from "../../common/guard/role.guard";
import { ReporteComponent } from "./reporte/reporte.component";

const routes: Routes = [
  {
    path: "",
    component: InteraccionesComponent,
    children: []
  },
  { path: "reporte", component: ReporteComponent }
  //   path: "adicionar",
  //   component: CrearComponent,
  //   canActivate: [RoleGuard]
  // },

  // { path: "editar/:id", component: EditarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteraccionesRoutingModule {}
