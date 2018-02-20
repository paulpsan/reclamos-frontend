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
  public depa;
  buscar: string = "";
  id: number;
  acciones: string;
  private sub: any;
  userForm: FormGroup;
  // searchForm: FormGroup;
  identity;
  usuario: any = JSON.parse(localStorage.getItem("identity"));
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      unidad_educativa: new FormControl("", Validators.required),
      departamento: new FormControl(""),
      distrito: new FormControl(""),
      dir_detallada: new FormControl(""),
      nombre_estudiante: new FormControl(""),
      detalle_reclamo: new FormControl(""),
      recive_informacion: new FormControl(""),
      nombre_denunciante: new FormControl(""),
      telefono_denunciante: new FormControl(""),
      fecha_reclamo: new FormControl(""),
      fecha_modificacion: new FormControl(""),
      observaciones: new FormControl(""),
      canal: new FormControl("")
    });
  }
  onSubmit() {
    console.log(this.usuario);
    let objeto = {
      unidad_educativa: this.userForm.controls["unidad_educativa"].value,
      departamento: this.userForm.controls["departamento"].value,
      distrito: this.userForm.controls["distrito"].value,
      dir_detallada: this.userForm.controls["dir_detallada"].value,
      nombre_estudiante: this.userForm.controls["nombre_estudiante"].value,
      detalle_reclamo: this.userForm.controls["detalle_reclamo"].value,
      recive_informacion: this.userForm.controls["recive_informacion"].value,
      nombre_denunciante: this.userForm.controls["nombre_denunciante"].value,
      telefono_denunciante: this.userForm.controls["telefono_denunciante"]
        .value,
      fecha_reclamo: this.userForm.controls["fecha_reclamo"].value,
      fecha_modificacion: this.userForm.controls["fecha_modificacion"].value,
      observaciones: this.userForm.controls["observaciones"].value,
      canal: this.userForm.controls["canal"].value,
      estado: "Registrado",
      fk_usuario: this.usuario._id
    };
    console.log(objeto);
    this._httpService.adicionar("reclamos", objeto).subscribe(response => {
      this.router.navigate(["/reclamos"]);
    });
    this.userForm.reset();
  }
  buscarUE(termino: string, departamento: string) {
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

  limpiar() {
    this.cargando = false;

    this.userForm.setValue({
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

  cargarDatos(item) {
    console.log(item);
    this.cargando = false;

    this.userForm.setValue({
      unidad_educativa: item.des_ue,
      departamento: item.des_departamento,
      distrito: item.des_distrito,
      dir_detallada: item.direccion + " Zona " + item.zona,
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

    // this._httpService.cargarUE("ue").subscribe((resp: any) => {
    //   this.unidadesEducativas = resp;
    //   this.cargando = false;
    // });
  }
}
