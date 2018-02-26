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
  public tipologias;
  public detalleConsula;
  public data: any[];
  public mostrar: boolean = false;
  public mostrarDetalle: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this._httpService.obtener("tipologias").subscribe(data => {
      this.tipologias = data;
    });
    if (localStorage.getItem("identity")) {
      this.identity = JSON.parse(localStorage.getItem("identity"));
    }

    this.consultasForm = new FormGroup({
      tipologias: new FormControl(null, Validators.required)
    });
  }
  cargar() {
    this.mostrar = true;
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

    let id = this.consultasForm.controls["tipologias"].value;

    this._httpService
      .obtenerPor("solicitudes", id, "tipologias")
      .subscribe(data => {
        if (!this.data) {
          this.dtTrigger.next();
        }
        this.data = data;
        console.log(data);
      });
  }
  detalle(data) {
    this.mostrarDetalle = true;
    this.detalleConsula = data;
  }
  atras(){
    this.mostrar=false;
    this.mostrarDetalle = false;
    this.data=[];

  }
  editar(consultas) {
    this.mostrarDetalle = false;
    console.log(consultas);
    if (consultas) {
      this.router.navigate(["/consultas/editar", consultas._id]);
    }
  }

  eliminar(consultas): void {
    
    console.log(consultas);
    let dialogRef = this.dialog.open(ModalEliminarConsulta, {
      width: "350px",
      data: consultas
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this._httpService
          .eliminarId("solicitudes", result._id)
          .subscribe(res => {
            setTimeout(() => {
              this.data = [];
              this.mostrarDetalle = false;
              // this.obtener();
            }, 100);
            // console.log('done');
          });
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
