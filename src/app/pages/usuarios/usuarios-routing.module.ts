import { UsuariosComponent } from "./usuarios.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CrearComponent } from "./crear-editar/crear.component";
import { EditarComponent } from "./crear-editar/editar.component";
import { RoleGuard } from "../../common/guard/role.guard";

const routes: Routes = [
  {
    path: "",
    component: UsuariosComponent,
    canActivate: [RoleGuard],
    children: []
  },
  {
    path: "adicionar",
    component: CrearComponent,
    canActivate: [RoleGuard]
  },

  { path: "editar/:id", component: EditarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {}
