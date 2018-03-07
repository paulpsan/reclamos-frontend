import { InteraccionesComponent } from "./interacciones.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { CrearComponent } from "./crear-editar/crear.component";
// import { EditarComponent } from "./crear-editar/editar.component";
import { RoleGuard } from "../../common/guard/role.guard";
import { InteraccionComponent } from "./interaccion/interaccion.component";

const routes: Routes = [
  {
    path: "",
    component: InteraccionesComponent,
    canActivate: [RoleGuard],
    children: []
  },
  {
    path: "interaccion",
    component: InteraccionComponent,
    // canActivate: [RoleGuard],
  }
  // {
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
