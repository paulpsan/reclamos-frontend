import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReclamosComponent } from "./reclamos.component";
import { CrearComponent } from "./crear-editar/crear.component";
import { EditarComponent } from "./crear-editar/editar.component";

const routes: Routes = [
  {
    path: "",
    component: ReclamosComponent,
    children: [
      // { path: "adicionar", component: CrearComponent },
      // { path: "editar/:id", component: EditarComponent }
    ]
  },
  { path: "adicionar", component: CrearComponent },
  { path: "editar/:id", component: EditarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamosRoutingModule {}
