import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpService } from "../../services/http.service";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "app-consultas",
  templateUrl: "./consultas.component.html",
  styleUrls: ["./consultas.component.css"]
})
export class ConsultasComponent implements OnInit {
  consultasForm: FormGroup;
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
    if (localStorage.getItem("identity")) {
      this.identity = JSON.parse(localStorage.getItem("identity"));
      console.log(this.identity);
    }
    this.consultasForm = new FormGroup({
      tipologias: new FormControl("", Validators.required)
    });
    this.obtener();
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
}
@Component({
  selector: "modal-eliminar-consulta",
  templateUrl: "modal-eliminar-consulta.html"
})
export class ModalEliminarConsulta {
  constructor(
    public dialogRef: MatDialogRef<ModalEliminarConsulta>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelarClick(): void {
    this.dialogRef.close();
  }
}
