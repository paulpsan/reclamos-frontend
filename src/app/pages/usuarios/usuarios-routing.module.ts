import { UsuariosComponent } from "./usuarios.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CrearComponent } from "./crear-editar/crear.component";
import { EditarComponent } from "./crear-editar/editar.component";

const routes: Routes = [
  {
    path: "",
    component: UsuariosComponent,
    children: [
    ]
  },
  { path: "adicionar", component: CrearComponent },
  { path: "editar/:id", component: EditarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {}
