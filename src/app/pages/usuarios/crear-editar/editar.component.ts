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
  public usuario;
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

    this.obtenerUsuario();
    this.userForm = new FormGroup({
      usuario: new FormControl("", Validators.required),
      rol: new FormControl(""),
      cambio: new FormControl(""),
      password: new FormControl(""),
      persona_nombres: new FormControl(""),
      persona_amaterno: new FormControl(""),
      persona_apaterno: new FormControl(""),
      persona_genero: new FormControl(""),
      persona_fecha_nacimiento: new FormControl("")
    });
  }
  obtenerUsuario() {
    this._httpService.buscarId("usuarios", this.id).subscribe(result => {
      this.usuario = result;
      this.cargarDatos();
    });
  }
  cargarDatos() {
    console.log(this.usuario);
    this.userForm.setValue({
      usuario: this.usuario.usuario,
      rol: this.usuario.rol,
      cambio: this.usuario.cambio,
      password: this.usuario.password,
      persona_nombres: this.usuario.nombres,
      persona_amaterno: this.usuario.amaterno,
      persona_apaterno: this.usuario.apaterno,
      persona_genero: this.usuario.genero,
      persona_fecha_nacimiento: this.usuario.fecha_nacimiento
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      let usuario = {
        _id: this.usuario._id,
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
        estado: this.userForm.controls["estado"].value
      };
      this._httpService.editar("usuarios", usuario).subscribe(res => {
        setTimeout(() => {
          this.userForm.reset();
          this.router.navigate(["/usuarios"]);
        }, 1000);
      });
    }
  }
}
