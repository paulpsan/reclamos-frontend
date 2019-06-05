import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GLOBAL } from "../../services/global";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../services/http.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ExcelService } from "../../services/excel.service";
import * as moment from "moment";

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
  public dataForm = [];
  public valorForm = [];
  public canal;
  public dataInstancia = {};
  public identity;
  public itemSelect;
  public showFormulario: Boolean = false;
  public showForm: Boolean = false;
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
      let objExcel = [];
      for (const iterator of data) {
        for (const item of iterator.Interacciones) {
          let dataExcel = {
            Identificador: iterator._id,
            Entrada: iterator.entrada,
            Creacion: iterator.createdAt,
            Red: item.entrada,
            Categoria: item.categoria,
            SubCategoria: item.subcategoria,
            Usuario: "",
            rol: ""
          };
          if (iterator.Usuario) {
            dataExcel.Usuario =
              iterator.Usuario.nombres + " " + iterator.Usuario.apaterno;
            dataExcel.rol = iterator.Usuario.rol;
          }
          if (item.InstanciaInteracciones.formulario) {
            let formulario = item.InstanciaInteracciones.formulario;
            console.log(formulario);
            var formularioObj = {};
            for (const key in formulario[0].campo) {
              if (formulario[0].campo[key] != ""&& formulario[1]) {
                let cadenaObj =
                  '{"' +
                  formulario[0].campo[key] +
                  '":"' +
                  formulario[1].valor[key] +
                  '"}';
                formularioObj = Object.assign(
                  formularioObj,
                  JSON.parse(cadenaObj)
                );
              }
            }
            dataExcel = Object.assign(dataExcel, formularioObj);
          }
          objExcel.push(dataExcel);
        }
      }
      this.excelService.exportAsExcelFile(objExcel, "INTERACCIONES");
    });
  }

  mostrar(cadena: string) {
    this.showInstancia = !this.showInstancia;
    this.canal = cadena;
    this.showInteraccion = false;
    this.showTable = false;
    this.showInst = false;
    this, this.userForm.reset();
  }

  finalizar() {

    let objInstancia = {
      entrada: this.userForm.controls["instancia"].value,
      canal: this.canal.toUpperCase(),
      fk_usuario: this.identity._id
    };

    this._httpService.adicionar("instancias", objInstancia).subscribe(data => {
      for (const iterator of this.objAdicionar) {
        let objPost = {
          fk_instancia: data._id,
          fk_interaccion: iterator._id,
          formulario: this.itemSelect.formulario
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
      .obtener("instancias/" + entrada + "/interacciones/" + this.canal)
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
  selectItem(item) {
    this.itemSelect = item;
    this.itemSelect.estado = !this.itemSelect.estado;
    if (this.itemSelect.estado) {
      console.log("adicionadoo!!", this.itemSelect);
      if (this.itemSelect.formulario) {
        this.dataForm = this.itemSelect.formulario[0].campo;
        console.log(this.dataForm);
        this.showForm = true;
      }
      this.objAdicionar.push(this.itemSelect);
      if (this.itemSelect) {
        this.showFormulario = true;
      }
    } else {
      let pos = this.objAdicionar.indexOf(this.itemSelect);
      let eliminado = this.objAdicionar.splice(pos, 1);
      this.showFormulario = false;
      this.showForm = false;
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
            formulario: iterator.formulario,
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
            formulario: iterator.formulario,
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
            formulario: iterator.formulario,
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
  guardarForm() {
    this.itemSelect.formulario.push({ valor: this.valorForm });
    this.showForm = false;
  }
}
