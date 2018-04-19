import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GLOBAL } from "../../services/global";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../services/http.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ExcelService } from "../../services/excel.service";

@Component({
  selector: "app-interacciones",
  templateUrl: "./interacciones.component.html",
  styleUrls: ["./interacciones.component.css"]
})
export class InteraccionesComponent implements OnInit {
  public showInteraccion: Boolean = false;
  public showInstancia: Boolean = false;
  public showTable: Boolean = false;
  public showButton: Boolean = false;
  public styleSelect: Boolean = false;
  public showInst: Boolean = false;
  public mostrarReporte: Boolean = false;
  public objAdicionar = [];
  public data = [];
  public redes;
  public dataInstancia = {};
  public identity;
  userForm: FormGroup;
  reporteForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog,
    private excelService: ExcelService
  ) {
    this.excelService = excelService;
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
    this.userForm = new FormGroup({
      instancia: new FormControl("", Validators.required)
    });
  }

  reporte() {
    this.mostrarReporte = false;
    let obj = {
      desde: this.reporteForm.controls["desde"].value,
      hasta: this.reporteForm.controls["hasta"].value
    };
    this._httpService.post("instancias/reporte", obj).subscribe(data => {
      console.log(data);
      let objExcel = [];
      for (const iterator of data) {
        for (const item of iterator.Interacciones) {
          let dataExcel = {
            Identificador: iterator._id,
            Entrada: iterator.entrada,
            Creacion: iterator.createdAt,
            Red: item.entrada,
            Categoria: item.categoria,
            SubCategoria: item.subcategoria
          };
          objExcel.push(dataExcel);
        }
      }

      console.log(objExcel);
      this.excelService.exportAsExcelFile(objExcel, "INTERACCIONES");
    });
  }

  mostrar(cadena: string) {
    this.showInstancia = !this.showInstancia;
    this.redes = cadena;
    this.showInteraccion = false;
    this.showTable = false;
    this.showInst = false;
    this, this.userForm.reset();
  }

  finalizar() {
    console.log(this.objAdicionar);
    console.log(this.userForm.controls["instancia"].value);

    let objInstancia = {
      entrada: this.userForm.controls["instancia"].value
    };

    this._httpService.adicionar("instancias", objInstancia).subscribe(data => {
      console.log(data);

      for (const iterator of this.objAdicionar) {
        let objPost = {
          fk_instancia: data._id,
          fk_interaccion: iterator._id
        };
        this._httpService
          .adicionar("instancias/" + data._id + "/interacciones", objPost)
          .subscribe(res => {
            console.log(res);
          });
      }

      this.showInteraccion = false;
      this.showInstancia = false;
      this.showTable = false;
      this.showInst = false;
      // this.data = res;
    });
  }
  buscar() {
    this.dataInstancia = {};
    this.showInteraccion = false;
    this.showTable = false;
    this.showInst = true;
    let entrada = this.userForm.controls["instancia"].value;
    this._httpService
      .obtener("instancias/" + entrada + "/interacciones/" + this.redes)
      .subscribe(res => {
        if (res.length >= 1) {
          let dataInteracciones = [];
          for (const iterator of res) {
            for (const iterac of iterator.Interacciones) {
              dataInteracciones.push(iterac);
            }
          }
          this.dataInstancia = {
            _id: res[0]._id,
            entrada: res[0].entrada,
            interacciones: dataInteracciones
          };
          console.log(this.dataInstancia);
        } else {
          console.log("datos vacios");
        }
      });
  }
  adicionar(item) {
    if (item.estado) {
      this.objAdicionar.push(item);
    } else {
      let pos = this.objAdicionar.indexOf(item);
      let eliminado = this.objAdicionar.splice(pos, 1);
      console.log(eliminado, this.objAdicionar);
      // this.objAdicionar = eliminado;
    }
  }

  consulta(entrada: string) {
    this.data = [];
    this.objAdicionar = [];
    this.showTable = true;
    this.showInst = false;

    this._httpService
      .obtener("interacciones?entrada=" + entrada + "&categoria=Consulta&")
      .subscribe(res => {
        for (const iterator of res) {
          let obj = {
            _id: iterator._id,
            categoria: iterator.categoria,
            subcategoria: iterator.subcategoria,
            descripcion: iterator.descripcion,
            entrada: iterator.entrada,
            estado: false
          };
          this.data.push(obj);
        }
      });
  }
  requerimiento(entrada: string) {
    this.data = [];
    this.objAdicionar = [];
    this.showTable = true;
    this.showInst = false;

    this._httpService
      .obtener("interacciones?entrada=" + entrada + "&categoria=Requerimiento&")
      .subscribe(res => {
        for (const iterator of res) {
          let obj = {
            _id: iterator._id,
            categoria: iterator.categoria,
            subcategoria: iterator.subcategoria,
            descripcion: iterator.descripcion,
            entrada: iterator.entrada,
            estado: false
          };
          this.data.push(obj);
        }
      });
  }
  denuncia(entrada: string) {
    this.data = [];
    this.objAdicionar = [];
    this.showTable = true;
    this.showInst = false;
    this._httpService
      .obtener("interacciones?entrada=" + entrada + "&categoria=Denuncia&")
      .subscribe(res => {
        for (const iterator of res) {
          let obj = {
            _id: iterator._id,
            categoria: iterator.categoria,
            subcategoria: iterator.subcategoria,
            descripcion: iterator.descripcion,
            entrada: iterator.entrada,
            estado: false
          };
          this.data.push(obj);
        }
      });
  }
  iniciar() {
    this.showInteraccion = true;
    this.showInst = false;
  }
}
