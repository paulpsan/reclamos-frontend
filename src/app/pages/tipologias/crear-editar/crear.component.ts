import { Usuario } from "./../../../models/usuario";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http.service";
import { GLOBAL } from "../../../services/global";

@Component({
  selector: "app-crear",
  templateUrl: "./crear.component.html",
  styleUrls: ["./crear.component.css"]
})
export class CrearComponent implements OnInit {
  public departamentos = GLOBAL.departamentos;
  public canales = GLOBAL.canales;
  public estados = GLOBAL.estados;
  public cargando: boolean = false;
  public tipologias;
  public depa;
  buscar: string = "";
  id: number;
  acciones: string;
  private sub: any;
  solicitudesForm: FormGroup;
  tipologiaForm: FormGroup;
  // searchForm: FormGroup;
  identity;
  usuario: any = JSON.parse(localStorage.getItem("identity"));
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this._httpService.obtener("tipologias").subscribe(data => {
      this.tipologias = data;
    });
    this.tipologiaForm = new FormGroup({
      nombreTipologia: new FormControl("", Validators.required),
      descripcionTipologia: new FormControl("")
    });

  }
  submitTipologia() {
    let objTipologia={
      nombre:this.tipologiaForm.controls["nombreTipologia"].value,
      descripcion:this.tipologiaForm.controls["descripcionTipologia"].value
    }
    this._httpService.adicionar("tipologias", objTipologia).subscribe(response => {
      this.router.navigate(["/tipologias"]);
    });
    this.tipologiaForm.reset();
  }
}
