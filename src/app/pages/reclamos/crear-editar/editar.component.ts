import { UsePipeTransformInterfaceRule } from "codelyzer";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http.service";
import { GLOBAL } from "../../../services/global";

@Component({
  selector: "app-editar",
  templateUrl: "./editar.component.html",
  styleUrls: ["./editar.component.css"]
})
export class EditarComponent implements OnInit {
  public reclamo;
  public identity;
  public departamentos = GLOBAL.departamentos;
  public canales = GLOBAL.canales;
  public estados = GLOBAL.estados;
  id: number;
  private sub: any;

  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    if (localStorage.getItem("identity")) {
      this.identity = JSON.parse(localStorage.getItem("identity"));
      console.log(this.identity);
    }
    this.obtenerReclamo();
    let access = false;
    console.log(this.identity.rol);
    if (this.identity.rol === "SUPERVISOR") {
      access = true;
    }

    this.userForm = new FormGroup({
      unidad_educativa: new FormControl({ value: "cargando...", disabled: access }),
      departamento: new FormControl({ value: "cargando...", disabled: access }),
      distrito: new FormControl({ value: "cargando...", disabled: access }),
      dir_detallada: new FormControl({ value: "cargando...", disabled: access }),
      nombre_estudiante: new FormControl({
        value: "cargando...",
        disabled: access
      }),
      detalle_reclamo: new FormControl({ value: "cargando...", disabled: access }),
      recive_informacion: new FormControl({
        value: "cargando...",
        disabled: access
      }),
      nombre_denunciante: new FormControl({
        value: "cargando...",
        disabled: access
      }),
      telefono_denunciante: new FormControl({
        value: "cargando...",
        disabled: access
      }),
      fecha_reclamo: new FormControl({ value: "cargando...", disabled: access }),
      fecha_modificacion: new FormControl({
        value: "cargando...",
        disabled: access
      }),
      observaciones: new FormControl({ value: "cargando...", disabled: false }),
      canal: new FormControl({ value: "cargando...", disabled: access }),
      estado: new FormControl({ value: "cargando...", disabled: false })
    });
  }
  obtenerReclamo() {
    this._httpService.buscarId("reclamos", this.id).subscribe(result => {
      this.reclamo = result;
      this.cargarDatos();
    });
  }
  cargarDatos() {
    console.log(this.reclamo);
    this.userForm.setValue({
      unidad_educativa: this.reclamo.unidad_educativa,
      departamento: this.reclamo.departamento,
      distrito: this.reclamo.distrito,
      dir_detallada: this.reclamo.dir_detallada,
      nombre_estudiante: this.reclamo.nombre_estudiante,
      detalle_reclamo: this.reclamo.detalle_reclamo,
      recive_informacion: this.reclamo.recive_informacion,
      nombre_denunciante: this.reclamo.nombre_denunciante,
      telefono_denunciante: this.reclamo.telefono_denunciante,
      fecha_reclamo: this.reclamo.fecha_reclamo,
      fecha_modificacion: this.reclamo.fecha_modificacion,
      observaciones: this.reclamo.observaciones,
      canal: this.reclamo.canal,
      estado: this.reclamo.estado
    });
  }

  onSubmit() {
    console.log(this.identity.nombre);
    if (this.userForm.valid) {
      let reclamo = {
        _id: this.reclamo._id,
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
        estado: this.userForm.controls["estado"].value,
        usuario_accion: this.identity.nombres +" "+this.identity.apaterno
      };
      this._httpService.editar("reclamos", reclamo).subscribe(res => {
        setTimeout(() => {
          this.userForm.reset();
          this.router.navigate(["/reclamos"]);
        }, 1000);
      });
    }
  }
}
