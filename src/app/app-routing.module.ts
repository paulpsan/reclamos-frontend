import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsuariosComponent } from "./pages/usuarios/usuarios.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from "./common/guard/auth.guard";

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
