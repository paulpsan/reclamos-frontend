import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../services/http.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subject } from "rxjs/Subject";
import { GLOBAL } from "../../services/global";
import { ExcelService } from "../../services/excel.service";
import { PERSONS, Person } from "../../models/models";

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
  public mostrar: Boolean = false;
  reporteForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  persons: Person[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog,
    private excelService: ExcelService
  ) {
    this.excelService = excelService;
    this.persons = PERSONS;
  }

  ngOnInit() {
    if (localStorage.getItem("identity")) {
      this.identity = JSON.parse(localStorage.getItem("identity"));
      console.log(this.identity);
    }
    this.reporteForm = new FormGroup({
      desde: new FormControl("", Validators.required),
      hasta: new FormControl("", Validators.required)
    });
    this.obtener();
  }
  descargar() {
    console.log(
      this.reporteForm.controls["desde"].value,
      this.reporteForm.controls["hasta"].value
    );
    this.mostrar = false;
    let obj = {
      desde: this.reporteForm.controls["desde"].value,
      hasta: this.reporteForm.controls["hasta"].value
    };
    this._httpService.adicionar("reclamos/reporte", obj).subscribe(data => {
      console.log(data);
      let objExcel = [];
      for (const iterator of data) {
        let obj = {
          ID: iterator._id,
          UNIDAD_EDUCATIVA: iterator.unidad_educativa,
          DEPARTAMENTO: iterator.departamento,
          DISTRITO: iterator.distrito,
          DIR_DETALLADA: iterator.dir_detallada,
          DETALLE_RECLAMO: iterator.detalle_reclamo,
          RECIVE_INFORMACION: iterator.recive_informacion,
          NOMBRE_DENUNCIANTE: iterator.nombre_denunciante,
          TELEFONO_DENUNCIANTE: iterator.telefono_denunciante,
          FECHA_RECLAMO: iterator.fecha_reclamo,
          FECHA_MODIFICACION: iterator.fecha_modificacion,
          CANAL: iterator.canal,
          USUARIO: iterator.Usuario.nombres + " " + iterator.Usuario.apaterno,
          ESTADO: iterator.estado,
          OBSERVACIONES: iterator.observaciones,
          USUARIO_ACCION: iterator.usuario_accion
        };
        console.log(obj);
        objExcel.push(obj);
      }
      this.excelService.exportAsExcelFile(objExcel, "RECLAMOS");
    });
  }
  obtener() {
    this.dtOptions = {
      order: [[0, "desc"]],
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
    this._httpService.obtener("reclamos").subscribe(data => {
      if (!this.data) {
        this.dtTrigger.next();
      }

      this.data = data;

      for (let index = 0; index < this.data.length; index++) {
        this._httpService;

        this.data[index].fecha_modificacion_formato = this.data[
          index
        ].fecha_modificacion
          .replace(/T/, " ")
          .slice(0, -6);
        this.data[index].fecha_reclamo_formato = this.data[index].fecha_reclamo
          .replace(/T/, " ")
          .slice(0, -6);
      }
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
            this.data = [];
            this.obtener();
          }, 100);
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
