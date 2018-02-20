import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../services/http.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"]
})
export class UsuariosComponent implements OnInit {
  public identity;
  public data: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (localStorage.getItem("identity")) {
      this.identity = JSON.parse(localStorage.getItem("identity"));
      console.log(this.identity);
    }
    this._httpService.obtener("usuarios").subscribe(data => {
      this.data = data;
    });
  }
  adicionar() {
    this.router.navigate(["/usuarios/adicionar"]);
  }

  editar(usuario) {
    console.log(usuario);
    if (usuario) {
      this.router.navigate(["/usuarios/editar", usuario._id]);
    }
  }

  eliminar(usuario): void {
    console.log(usuario);
    let dialogRef = this.dialog.open(ModalEliminarUsuario, {
      width: "350px",
      data: usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this._httpService.eliminarId("usuarios", result._id).subscribe(res => {
          //AQUI colocamos las notificaciones!!
          setTimeout(() => {
            this._httpService.obtener("usuarios").subscribe(data => {
              this.data = data;
            });
          }, 1000);
        });
      }
    });
  }
}

@Component({
  selector: "modal-eliminar-usuario",
  templateUrl: "modal-eliminar-usuario.html"
})
export class ModalEliminarUsuario {
  constructor(
    public dialogRef: MatDialogRef<ModalEliminarUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelarClick(): void {
    this.dialogRef.close();
  }
}
