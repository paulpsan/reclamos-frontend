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
  public unidadesEducativas;
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
    this.tipologiaForm = new FormGroup({
      nombreTipologia: new FormControl("", Validators.required),
      descripcionTipologia: new FormControl("")
    });

    this.solicitudesForm = new FormGroup({
      tipologia: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required)
    });
  }
  submitTopologia() {}
  onSubmit() {
    console.log(this.usuario);
    let objeto = {
      unidad_educativa: this.solicitudesForm.controls["unidad_educativa"].value,
      departamento: this.solicitudesForm.controls["departamento"].value,
      distrito: this.solicitudesForm.controls["distrito"].value,
      dir_detallada: this.solicitudesForm.controls["dir_detallada"].value,
      fk_usuario: this.usuario._id
    };
    console.log(objeto);
    this._httpService.adicionar("reclamos", objeto).subscribe(response => {
      this.router.navigate(["/reclamos"]);
    });
    this.solicitudesForm.reset();
  }
  buscarUE(termino: string, departamento: string) {
    if (termino) {
      termino = termino.toUpperCase();
      console.log(termino, departamento);
      this.cargando = false;
      this._httpService
        .buscar("unidades-educativas/search ", { des_ue: termino })
        .subscribe(ues => {
          if (departamento) {
            departamento = departamento.toUpperCase();
            let dep = new Array();
            console.log(departamento, ues);

            for (const iterator of ues) {
              console.log(iterator.des_departamento, departamento);
              if (iterator.des_departamento.trim() == departamento) {
                dep.push(iterator);
                console.log(dep);
              }
            }
            this.unidadesEducativas = dep;
            // return;
          } else {
            this.unidadesEducativas = ues;
          }

          console.log(this.unidadesEducativas);
          this.cargando = true;
        });
    }
  }

  limpiar() {
    this.cargando = false;
    this.buscar = "";

    this.solicitudesForm.setValue({
      unidad_educativa: "",
      departamento: "",
      distrito: "",
      dir_detallada: "",
      nombre_estudiante: "",
      detalle_reclamo: "",
      recive_informacion: "",
      nombre_denunciante: "",
      telefono_denunciante: "",
      fecha_reclamo: "",
      fecha_modificacion: "",
      observaciones: "",
      canal: ""
    });
  }
}
