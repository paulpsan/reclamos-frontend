import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../services/http.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subject } from "rxjs/Subject";
import { GLOBAL } from "./../../services/global";

@Component({
  selector: "app-reclamo",
  templateUrl: "./reclamos.component.html",
  styleUrls: ["./reclamos.component.css"]
})
export class ReclamosComponent implements OnInit {
  public identity;
  public data: any[];
  public fecha_reclamo_formato;
  public fecha_modificacion_formato;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      language: {
        search: "Buscar",
        lengthMenu: "Mostrar _MENU_ entradas",
        info: "Mostrar Pagina _PAGE_ de _PAGES_",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Ultimo"
        }
      }
    };

    if (localStorage.getItem("identity")) {
      this.identity = JSON.parse(localStorage.getItem("identity"));
      console.log(this.identity);
    }
    this.obtener();
  }
  obtener() {
    this._httpService.obtener("reclamos").subscribe(data => {
      this.data = data;

      for (let index = 0; index < this.data.length; index++) {
        this._httpService;

        this.data[index].fecha_modificacion_formato = this.data[
          index
        ].fecha_modificacion
          .replace(/T/, " ") // replace T with a space
          .slice(0, -6); // delete the dot and everything after
        this.data[index].fecha_reclamo_formato = this.data[index].fecha_reclamo
          .replace(/T/, " ") // replace T with a space
          .slice(0, -6); // delete the dot and everything after;
        console.log(this.data);
      }
      this.dtTrigger.next();
    });
  }
  adicionar() {
    this.router.navigate(["/reclamos/adicionar"]);
  }
  editar(reclamo) {
    console.log(reclamo);
    if (reclamo) {
      this.router.navigate(["/reclamos/editar", reclamo._id]);
    }
  }
  eliminar(reclamo): void {
    console.log(reclamo);
    let dialogRef = this.dialog.open(ModalEliminarReclamo, {
      width: "350px",
      data: reclamo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this._httpService.eliminarId("reclamos", result._id).subscribe(res => {
          //AQUI colocamos las notificaciones!!
          setTimeout(() => {
            this.obtener();
          }, 1000);
          // console.log('done');
        });
      }
    });
  }
}
@Component({
  selector: "modal-eliminar-reclamo",
  templateUrl: "modal-eliminar-reclamo.html"
})
export class ModalEliminarReclamo {
  constructor(
    public dialogRef: MatDialogRef<ModalEliminarReclamo>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelarClick(): void {
    this.dialogRef.close();
  }
}
