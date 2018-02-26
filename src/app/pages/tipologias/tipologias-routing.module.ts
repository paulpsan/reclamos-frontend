import { TipologiasComponent } from "./tipologias.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CrearComponent } from "./crear-editar/crear.component";
import { EditarComponent } from "./crear-editar/editar.component";
import { RoleGuard } from "../../common/guard/role.guard";

const routes: Routes = [
  {
    path: "",
    component: TipologiasComponent,
    children: []
  },
  {
    path: "adicionar",
    component: CrearComponent
  },

  { path: "editar/:id", component: EditarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipologiasRoutingModule {}
