import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpService } from "../../services/http.service";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs";

@Component({
  selector: "app-consultas",
  templateUrl: "./consultas.component.html",
  styleUrls: ["./consultas.component.css"]
})
export class ConsultasComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  public identity;
  public tipologias;
  public detalleConsula;
  public data: any[];
  public mostrar: boolean = false;
  public mostrarDetalle: boolean = false;
  public filterQuery;
  public selectedValue;
  consultasForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog
  ) {}

  cargar(itemSelect) {
    // if (this.subscription) {
    //   this.data = [];
    //   this.subscription.unsubscribe();
    //   this.dtTrigger.unsubscribe();
    // }
    this.mostrar = true;
    // console.log(itemSelect);

    // setTimeout(() => {
    //   this.mostrar = true;
    // }, 500);
    this.dtOptions = {
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

    this.subscription = this._httpService
      .obtenerPor("solicitudes", itemSelect, "tipologias")
      .subscribe(data => {
        if (!this.data) {
          this.dtTrigger.next();
        }
        this.rerender();
        this.data = data;
        console.log(data);
      });
  }
  detalle(data) {
    this.router.navigate(["/consultas/detalle", data._id]);
  }

  rerender(): void {
    console.log(this.dtElement);
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
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
  ngOnInit() {
    this._httpService.obtener("tipologias").subscribe(data => {
      this.tipologias = data;
    });
    if (localStorage.getItem("identity")) {
      this.identity = JSON.parse(localStorage.getItem("identity"));
    }
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
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
