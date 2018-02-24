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
    path: "redes",
    loadChildren: "./pages/redes/redes.module#RedesModule",
    canActivate: [AuthGuard]
  },
  {
    path: "consultas",
    loadChildren: "./pages/consultas/consultas.module#ConsultasModule"
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
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
