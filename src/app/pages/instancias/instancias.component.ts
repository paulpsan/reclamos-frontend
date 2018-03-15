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
  selector: "app-instancias",
  templateUrl: "./instancias.component.html",
  styleUrls: ["./instancias.component.css"]
})
export class InstanciasComponent implements OnInit {
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
    this._httpService.obtener("interacciones").subscribe(data => {
      this.data = data;
    });
  }
  adicionar() {
    this.router.navigate(["/instancias/adicionar"]);
  }

  editar(instancia) {
    console.log(instancia);
    if (instancia) {
      this.router.navigate(["/instancias/editar", instancia._id]);
    }
  }

  eliminar(instancia): void {
    console.log(instancia);
    let dialogRef = this.dialog.open(ModalEliminarInstancia, {
      width: "350px",
      data: instancia
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this._httpService
          .eliminarId("interacciones", result._id)
          .subscribe(res => {
            //AQUI colocamos las notificaciones!!
            setTimeout(() => {
              this._httpService
                .obtener("interacciones")
                .subscribe(data => {
                  this.data = data;
                });
            }, 1000);
          });
      }
    });
  }
}

@Component({
  selector: "modal-eliminar-instancia",
  templateUrl: "modal-eliminar-instancia.html"
})
export class ModalEliminarInstancia {
  constructor(
    public dialogRef: MatDialogRef<ModalEliminarInstancia>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelarClick(): void {
    this.dialogRef.close();
  }
}
