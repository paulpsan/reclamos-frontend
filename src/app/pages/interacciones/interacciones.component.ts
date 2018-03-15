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
  public objAdicionar = [];
  public data = [];
  public redes;
  userForm: FormGroup;

  public facebook;
  public chat;
  public correo;
  public whatsapp;
  public linea;
  public twitter;
  public items;
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
    this.userForm = new FormGroup({
      instancia: new FormControl("", Validators.required)
    });
  }

  mostrar(cadena: string) {
    this.showInstancia = true;
    this.redes = cadena;
    this.showInteraccion = false;
    this.showTable = false;
    this.showInst = false;
    this, this.userForm.reset();
  }

  finalizar() {
    console.log(this.objAdicionar);
    console.log(this.userForm.controls["instancia"].value);
    let objPost = {
      entrada: this.userForm.controls["instancia"].value,
      interacciones: this.objAdicionar
    };
    this._httpService.adicionar("instancias", objPost).subscribe(res => {
      console.log(res);
      this.showInteraccion = false;
      this.showInstancia = false;
      this.showTable = false;
      this.showInst = false;
      // this.data = res;
    });
  }
  buscar() {
    this.showInteraccion = false;
    this.showInstancia = false;
    this.showTable = false;
    this.showInst = true;
    console.log(this.objAdicionar);
    console.log(this.userForm.controls["instancia"].value);
    let objPost = {
      entrada: this.userForm.controls["instancia"].value,
      interacciones: this.objAdicionar
    };
    this._httpService.buscarId("instancias", objPost.entrada).subscribe(res => {
      console.log(res);
      // this.data = res;
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
