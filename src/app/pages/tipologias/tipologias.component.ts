import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpService } from "../../services/http.service";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "app-tipologias",
  templateUrl: "./tipologias.component.html",
  styleUrls: ["./tipologias.component.css"]
})
export class TipologiasComponent implements OnInit {
  tipologiasForm: FormGroup;
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
    if (localStorage.getItem("identity")) {
      this.identity = JSON.parse(localStorage.getItem("identity"));
      console.log(this.identity);
    }

    this.tipologiasForm = new FormGroup({
      tipologias: new FormControl(null, Validators.required)
    });
    this.cargar();
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

    let id = this.tipologiasForm.controls["tipologias"].value;

    this._httpService.obtener("tipologias").subscribe(data => {
      if (!this.tipologias) {
        this.dtTrigger.next();
      }
      this.tipologias = data;
      console.log(this.tipologias);
    });
  }
  detalle(data) {
    this.mostrarDetalle = true;
    this.detalleConsula = data;
  }
  atras() {
    this.mostrarDetalle = false;
  }
  editar(tipologias) {
    this.mostrarDetalle = false;
    console.log(tipologias);
    if (tipologias) {
      this.router.navigate(["/tipologias/editar", tipologias._id]);
    }
  }

  eliminar(tipologias): void {
    console.log(tipologias);
    let dialogRef = this.dialog.open(ModalEliminarTipologia, {
      width: "350px",
      data: tipologias
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this._httpService
          .eliminarId("tipologias", result._id)
          .subscribe(res => {
            setTimeout(() => {
              this.tipologias = [];
              this.mostrarDetalle = false;
              this.cargar();
            }, 100);
            // console.log('done');
          });
      }
    });
  }
}
@Component({
  selector: "modal-eliminar-tipologia",
  templateUrl: "modal-eliminar-tipologia.html"
})
export class ModalEliminarTipologia {
  constructor(
    public dialogRef: MatDialogRef<ModalEliminarTipologia>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelarClick(): void {
    this.dialogRef.close();
  }
}
