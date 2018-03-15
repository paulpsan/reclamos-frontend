import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from "./common/guard/auth.guard";
import { RoleGuard } from "./common/guard/role.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "reclamos",
    loadChildren: "./pages/reclamos/reclamos.module#ReclamosModule",
    canActivate: [AuthGuard]
  },
  {
    path: "usuarios",
    loadChildren: "./pages/usuarios/usuarios.module#UsuariosModule",
    canActivate: [AuthGuard]
  },
  {
    path: "consultas",
    loadChildren: "./pages/consultas/consultas.module#ConsultasModule",
    canActivate: [AuthGuard]
  },
  {
    path: "tipologias",
    loadChildren: "./pages/tipologias/tipologias.module#TipologiasModule",
    canActivate: [AuthGuard]
  },
  {
    path: "interacciones",
    loadChildren:
      "./pages/interacciones/interacciones.module#InteraccionesModule",
    canActivate: [AuthGuard]
  },
  {
    path: "instancias",
    loadChildren: "./pages/instancias/instancias.module#InstanciasModule",
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: "login"
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
