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

  solicitudesForm: FormGroup;
  tipologiaForm: FormGroup;

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
  obtenerReclamo() {
    this._httpService.buscarId("reclamos", this.id).subscribe(result => {
      this.reclamo = result;
      this.cargarDatos();
    });
  }
  cargarDatos() {
    console.log(this.reclamo);
    this.solicitudesForm.setValue({
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
    if (this.solicitudesForm.valid) {
      let reclamo = {
        _id: this.reclamo._id,
        unidad_educativa: this.solicitudesForm.controls["unidad_educativa"]
          .value,
        departamento: this.solicitudesForm.controls["departamento"].value,
        distrito: this.solicitudesForm.controls["distrito"].value,
        dir_detallada: this.solicitudesForm.controls["dir_detallada"].value,
        nombre_estudiante: this.solicitudesForm.controls["nombre_estudiante"]
          .value,
        detalle_reclamo: this.solicitudesForm.controls["detalle_reclamo"].value,
        recive_informacion: this.solicitudesForm.controls["recive_informacion"]
          .value,
        nombre_denunciante: this.solicitudesForm.controls["nombre_denunciante"]
          .value,
        telefono_denunciante: this.solicitudesForm.controls[
          "telefono_denunciante"
        ].value,
        fecha_reclamo: this.solicitudesForm.controls["fecha_reclamo"].value,
        fecha_modificacion: this.solicitudesForm.controls["fecha_modificacion"]
          .value,
        observaciones: this.solicitudesForm.controls["observaciones"].value,
        canal: this.solicitudesForm.controls["canal"].value,
        estado: this.solicitudesForm.controls["estado"].value,
        usuario_accion: this.identity.nombres + " " + this.identity.apaterno
      };
      this._httpService.editar("reclamos", reclamo).subscribe(res => {
        setTimeout(() => {
          this.solicitudesForm.reset();
          this.router.navigate(["/reclamos"]);
        }, 1000);
      });
    }
  }
}
